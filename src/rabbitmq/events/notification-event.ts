import { NotificationType } from "../../enums";

export type NotificationEventEvent<T> = {
  type: NotificationType;
  data: T;
};
