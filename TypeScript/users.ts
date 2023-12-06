import { v4 as uuidv4 } from 'uuid';

declare type userId = string;
declare type ISODateString = string;

interface Subscripion {
    isExpired: boolean;
    expiryDate: ISODateString;
}

interface User {
    id: userId;
    firstName: string;
    lastName: string;
    subscription: Subscripion;
}

const createUser = (firstName: string, lastName: string, subscription: Subscripion): User => {
    return {
        id: uuidv4(),
        firstName,
        lastName,
        subscription
    }
}

const isDateExpired = (dateString: ISODateString): boolean => {
    const date = new Date(dateString);
    const now = new Date();
    return date < now;
}

const createSubscription = (isExpired: boolean, expiryDate: ISODateString): Subscripion => {
    return {
        isExpired: isDateExpired(expiryDate),
        expiryDate: expiryDate
    }
}

const subscription = createSubscription(false, '2023-12-31');
const user = createUser('John', 'Doe', subscription);