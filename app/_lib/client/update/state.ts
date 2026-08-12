"use client"


import { useState } from "react";

type StateUpdateListenerProps<value> = {
    value: value;
    onUpdate(): void;
}

export function StateUpdateListener<value>({value, onUpdate}: StateUpdateListenerProps<value>) {
    const [oldValue, setOldValue] = useState(value);
    if (oldValue !== value) {
        setOldValue(value);
        onUpdate();
    }
}