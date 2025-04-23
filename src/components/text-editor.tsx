import {
  BtnUndo,
  BtnRedo,
  BtnBold,
  BtnItalic,
  BtnUnderline,
  BtnNumberedList,
  BtnBulletList,
  Separator,
  Editor,
  EditorProvider,
  Toolbar
} from 'react-simple-wysiwyg';
import { SyntheticEvent } from 'react';

export type ContentEditableEvent = SyntheticEvent<any, Event> & {
  target: {
    name?: string;
    value: string;
  };
};

interface TextEditorProps {
  name?: string;
  value?: string;
  onChange?: (e: ContentEditableEvent) => void
}

const TextEditor = ({ name, value, onChange }: TextEditorProps) => {
  return (
    <EditorProvider>
      <Editor
        containerProps={{ style: { resize: 'vertical' } }}
        value={value}
        onChange={onChange}
        name={name}
      >

        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />

          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <Separator />

          <BtnNumberedList />
          <BtnBulletList />
        </Toolbar>

      </Editor>
    </EditorProvider>
  )
}

export default TextEditor
