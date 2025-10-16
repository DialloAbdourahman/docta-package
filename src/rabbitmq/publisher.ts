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

// import amqp from "amqplib";

// interface ListenerOptions<T> {
//   exchange: string;
//   queue: string;
//   routingKeys: string[];
// }

// export async function listenToQueue<T>({
//   exchange,
//   queue,
//   routingKeys,
// }: ListenerOptions<T>) {
//   try {
//     const connection = await amqp.connect("amqp://localhost");
//     const channel = await connection.createChannel();

//     await channel.assertExchange(exchange, "topic", { durable: true });
//     await channel.assertQueue(queue, { durable: true });

//     // Bind queue to each routing key
//     for (const key of routingKeys) {
//       await channel.bindQueue(queue, exchange, key);
//       console.log(`✅ Bound queue "${queue}" to routing key "${key}"`);
//     }

//     console.log(
//       `🎧 Listening on "${queue}" for routing keys: [${routingKeys.join(", ")}]`
//     );

//     await channel.consume(
//       queue,
//       (msg) => {
//         if (!msg) return;

//         const routingKey = msg.fields.routingKey;
//         const content = msg.content.toString();

//         try {
//           const data: T = JSON.parse(content);

//           // Handle messages based on routing key
//           switch (routingKey) {
//             case "user.created":
//               console.log("👤 User created:", data);
//               break;

//             case "user.updated":
//               console.log("✏️ User updated:", data);
//               break;

//             case "user.deleted":
//               console.log("🗑️ User deleted:", data);
//               break;

//             default:
//               console.warn("⚠️ Unhandled routing key:", routingKey, data);
//           }

//           channel.ack(msg);
//         } catch (err) {
//           console.error("❌ Failed to process message:", err);
//           channel.nack(msg, false, true);
//         }
//       },
//       { noAck: false }
//     );
//   } catch (error) {
//     console.error("Error setting up listener:", error);
//   }
// }
