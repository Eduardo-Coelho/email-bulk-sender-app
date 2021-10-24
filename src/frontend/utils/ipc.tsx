import { ipcRenderer } from "electron";

export enum IPCs {
  SendEmail = "send-email",
  ReplyEmail = "reply-email",
}

/**
 * @todo - add types to the any
 */

export const IpcSend = async (type: string, send: any = "") => {
  ipcRenderer.send(type, send);
};

export const IpcReply = async (type: string) => {
  ipcRenderer.on(type, (event: any, arg: any) => {
    console.log(arg);
  });
};
