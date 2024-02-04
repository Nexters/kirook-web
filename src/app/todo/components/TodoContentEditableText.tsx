import { type FocusEvent, type MutableRefObject } from 'react';
import ContentEditable, { type ContentEditableEvent } from 'react-contenteditable';

interface ContentEditableTextProps {
  textRef: MutableRefObject<string>;
  onFocus(e: FocusEvent<HTMLDivElement>): void;
  onBlur(e: FocusEvent<HTMLDivElement>): void;
}

export function TodoContentEditableText({ textRef, onFocus, onBlur }: ContentEditableTextProps) {
  const handleChange = (e: ContentEditableEvent) => {
    textRef.current = e.target.value;
  };

  return (
    <ContentEditable
      className='grow overflow-hidden bg-transparent text-title3 outline-none transition-colors duration-300 focus:bg-grayscale-50'
      html={textRef.current}
      onChange={handleChange}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
