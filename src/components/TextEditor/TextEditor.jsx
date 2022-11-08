import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

TextEditor.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

TextEditor.defaultValues = {
  name: '',
  value: '',
  onChange: null,
};

function TextEditor({ name, value, onChange }) {
  const editorRef = useRef(null);

  return (
    <Editor
      onChange={() => {
        if (editorRef.current) {
          onChange(editorRef.current.getContent());
        }
      }}
      value={value}
      textareaName={name}
      apiKey="9uz2zs69ml86pcrhrdvz59sq3vna5wisy49g1s6c0af2ynjy"
      onInit={(e, editor) => (editorRef.current = editor)}
      init={{
        height: 500,
        menubar: true,
        plugins: [
          'advlist',
          'autolink',
          'lists',
          'link',
          'image',
          'charmap',
          'preview',
          'anchor',
          'searchreplace',
          'visualblocks',
          'code',
          'fullscreen',
          'insertdatetime',
          'media',
          'table',
          'code',
          'help',
          'wordcount',
        ],
        toolbar:
          'undo redo | blocks | ' +
          'bold italic forecolor | alignleft aligncenter ' +
          'alignright alignjustify | bullist numlist outdent indent | ' +
          'removeformat | help',
        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
      }}
    />
  );
}

export default TextEditor;
