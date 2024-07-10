import { createMessage, deleteMessage, editMessage } from "../controllers/Message.controller.js";
import { ApiError } from "../utils/ApiError.js";

export const configureSocket = (io) => {
    io.on("connection", (socket) => {
        console.log("New User Connected!");

        //Sending message:
        socket.on("sendMessage", async (messageData) => {
            try {
                const message = await createMessage(
                    {
                        body: messageData,
                    },
                    {
                        status: () => {},
                        json: (data) => data,
                    }
                );
                io.to(messageData.chatId).emit("receiveMessage", message);
            } catch (error) {
                console.log("Error sending message:",error);
                throw new ApiError(500,"Error while sending message");
            }
        });

        //Deleting message:
        socket.on('deleteMessage',async(messageData) => {
            try {
                await deleteMessage(
                    {
                        body: messageData,
                    },
                    {
                        status: () => {},json: () => {}
                    }
                );
                io.to(messageData.chatId).emit('messageDeleted',messageData.messageId);
            } catch (error) {
                console.log("Error deleting message:",error);
                throw new ApiError(500,"Error deleting message");
            }
        })

        //Editing message:
        socket.io('editMessage', async(messageData) => {
            try {
                const message = await editMessage(
                    {
                        body: messageData,
                    },
                    {
                        status: () => {}, json: (data) => data
                    }
                );
                io.to(messageData.chatId).emit('messageEdited',message);
            } catch (error) {
                console.log("Error editing message:",error);
                throw new ApiError(500,"Error editing message");
            }
        });

        socket.on('joinChat', (chatId) => {
            socket.join(chatId);
            console.log(`Client joined chat: ${chatId}`);
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected');
        });
    });
};
