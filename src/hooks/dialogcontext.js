import React, { createContext, useState, useContext } from 'react';
import { View } from 'react-native';
import { Portal, Dialog, Button, Text, Snackbar } from 'react-native-paper';

const DialogContext = createContext(null);

export const DialogProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [content, setContent] = useState({ type: '', title: '', message: '', onConfirm: null, ok: '', cancel: '' });

    // Hàm hiển thị dialog
    const showDialog = ({ type, title, message, onConfirm, ok, cancel }) => {
        setContent({ type, title, message, onConfirm, ok, cancel });
        setVisible(true);
    };

    // Hàm ẩn dialog
    const hideDialog = () => setVisible(false);

    // Hàm xác nhận dialog
    const confirm = () => {
        if (content.onConfirm) content.onConfirm();
        hideDialog();
    };

    return (
        <DialogContext.Provider value={{ showDialog }}>
            {children}

            {
                content.type === 'snackbar' ?
                    // Nếu là snackbar thì hiển thị Snackbar
                    <Snackbar visible={visible} onDismiss={hideDialog}
                        style={{ backgroundColor: '#FF660099', bottom: 55}}
                        action={{
                            label: '✕',
                            onPress: hideDialog,
                        }}>
                        {content.message}
                    </Snackbar>
                    :
                    // Nếu là dialog thì hiển thị Dialog
                    <Portal>
                        <Dialog visible={visible} onDismiss={hideDialog}>
                            {/* hiển thị title nếu có */}
                            {content.title && <Dialog.Title>{content.title}</Dialog.Title>}
                            {/* nội dụng Dialog */}
                            <Dialog.Content>
                                <Text variant="bodyMedium">{content.message}</Text>
                            </Dialog.Content>
                            <Dialog.Actions>
                                {
                                    content.type === 'confirm' &&
                                    // hiển thị nút xác nhận và hủy nếu là confirm
                                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                        <Button onPress={hideDialog}>{content.cancel ? content.cancel : 'Hủy'}</Button>
                                        <Button onPress={confirm}>{content.ok ? content.ok : 'Đồng ý'}</Button>
                                    </View>
                                }
                                {
                                    // hiển thị nút OK nếu là alert
                                    content.type === 'alert' &&
                                    <Button onPress={hideDialog}>OK</Button>
                                }

                            </Dialog.Actions>
                        </Dialog>
                    </Portal>
            }
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);
