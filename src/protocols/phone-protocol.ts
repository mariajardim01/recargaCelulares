export type PhoneNumber = {
    number: string,
    carrier: string
}

export type NumberData = Omit<PhoneNumber, 'carrier'> & { // Isso resulta em { number: string } & { id: number, user_id: number, carrier_id: number }
    id: number,
    user_id: number,
    carrier_id: number
}

export type InsertNumber = Omit<PhoneNumber, 'carrier'> & {
    user_id: number;
    carrier_id: number;
};

export type NumberFromDB = NumberData & { // Isso pega TUDO de NumberData e adiciona 'created_at'
    created_at: Date;
}

