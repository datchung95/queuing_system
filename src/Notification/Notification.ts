import { notification } from 'antd';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

const openNotificationWithIcon = (type: NotificationType, message: string) => {
    notification[type]({
        message: message
    });
};

export default openNotificationWithIcon;