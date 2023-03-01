export enum SocketEvent {
  getMessage = 'event_get_message',
  onException = 'event_on_exception',
  sendMessage = 'event_send_message',
  joinRoom = 'event_join_room',
  leaveRoom = 'event_leave_room',
  joinUser = 'event_join_user',
  leaveUser = 'event_leave_user',
  notifications = 'event_notifications',
}
