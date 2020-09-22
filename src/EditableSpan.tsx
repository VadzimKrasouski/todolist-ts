import React, {ChangeEvent, useState} from 'react';

type PropsType = {
    value: string
    onChange: (newValue: string) => void
}

export function EditableSpan(props: PropsType) {
    let [editMode, setEditMode] = useState<boolean>(false);
    let [title, setTitle] = useState<string>(props.value);

    const activatedEditMode = () => {
        setEditMode(true);
        setTitle(props.value);
    }

    const deActivateEditMode = () => {
        setEditMode(false);
        props.onChange(title)
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };
    return editMode
        ? <input value={title}
                 autoFocus={true}
                 onBlur={deActivateEditMode}
                 onChange={onChangeHandler}/>
        : <span onDoubleClick={activatedEditMode}>{props.value}</span>
}