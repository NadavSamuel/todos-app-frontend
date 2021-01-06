import React from 'react'
import { Markable } from '../interfaces'
import { Button,List,Message } from 'semantic-ui-react'

interface MarkableProps {
    markable: Markable,
    onToggleMarkable(markable: Markable): void,
    onToggleMarkable(markable: Markable): void,
    onDeleteMarkable(markableTxt: string): void
}
export const MarkableCmp: React.FC<MarkableProps> = ({ onToggleMarkable, markable, onDeleteMarkable }) => {
    const { txt, isDone } = markable
    const isMarked = isDone ? 'done' : '';
    function dispatchDeleteMarkable(event) {
        event.stopPropagation()
        onDeleteMarkable(txt);
    }
    return (
        <List.Item as="li"  className={`markable `} key={txt} onClick={() => onToggleMarkable(markable)} >
            <Message positive = { isMarked? true : false}>{txt}</Message>
            <Button  icon="delete" onClick={dispatchDeleteMarkable}></Button>
        </List.Item>

    );
}