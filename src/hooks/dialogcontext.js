import React, { createContext, useState, useContext } from 'react';
import { View } from 'react-native';
import { Portal, Dialog, Button, Text, Snackbar } from 'react-native-paper';
import { FullLoading } from '../components/loading';

const DialogContext = createContext(null);

export const DialogProvider = ({ children }) => {
    const [visible, setVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [content, setContent] = useState({ type: '', title: '', message: '', onConfirm: null, onCancel: null, ok: '', cancel: '' });

    // Loading toàn màn hình
    const showFullLoading = (show) => {
        setLoading(show);
    }

    // Hàm hiển thị dialog
    const showDialog = ({ type, title, message, onConfirm, onCancel, ok, cancel }) => {
        setContent({ type, title, message, onConfirm, onCancel, ok, cancel });
        setVisible(true);
    };

    // Hàm ẩn dialog
    const hideDialog = () => {
        setVisible(false);
    }

    // Hàm xác nhận dialog
    const confirmBtn = () => {
        if (content.onConfirm) content.onConfirm();
        hideDialog();
    };

    // Hàm Cancel dialog
    const cancelBtn = () => {
        if (content.onCancel) content.onCancel();
        hideDialog();
    };

    return (
        <DialogContext.Provider value={{ showDialog, showFullLoading }}>
            {children}
            {/* Hiển thị full loading*/}
            { loading ? <FullLoading /> : null}
            {/* Hiển thị Dialog */}
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
                                <Button onPress={cancelBtn}>{content.cancel ? content.cancel : 'Hủy'}</Button>
                                <Button onPress={confirmBtn}>{content.ok ? content.ok : 'Đồng ý'}</Button>
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
        </DialogContext.Provider>
    );
};

export const useDialog = () => useContext(DialogContext);
