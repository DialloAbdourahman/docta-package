import amqp from "amqplib";
import { RoutingKey } from "../enums";
import { getGeneralConfig } from "../config";

interface PublishOptions<T> {
  exchange: string;
  routingKey: RoutingKey;
  message: T;
}

export async function publishToTopicExchange<T>({
  exchange,
  routingKey,
  message,
}: PublishOptions<T>) {
  try {
    // Connect to RabbitMQ server
    const connection = await amqp.connect(getGeneralConfig().rabbitmqHost);
    const channel = await connection.createChannel();

    // Assert the topic exchange exists
    await channel.assertExchange(exchange, "topic", { durable: true });

    // Convert the object message to a Buffer
    const messageBuffer = Buffer.from(JSON.stringify(message));

    // Publish the message
    const published = channel.publish(exchange, routingKey, messageBuffer);

    console.log(
      published
        ? `Message sent to exchange "${exchange}" with routing key "${routingKey}"`
        : "Message could not be published"
    );

    // Close channel and connection
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error("Error publishing message:", error);
  }
}
