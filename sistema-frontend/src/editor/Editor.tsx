import React, { useRef, useState, useEffect } from "react";
import { useTheme } from "@mui/material";
import {
  MenuButtonBold,
  MenuButtonBulletedList,
  MenuButtonCodeBlock,
  MenuButtonEditLink,
  MenuButtonHighlightColor,
  MenuButtonOrderedList,
  MenuButtonRedo,
  MenuButtonStrikethrough,
  MenuButtonTaskList,
  MenuButtonTextColor,
  MenuButtonUndo,
  MenuControlsContainer,
  MenuSelectFontSize,
  MenuSelectHeading,
  MenuSelectTextAlign,
  TableMenuControls,
  LinkBubbleMenu,
  RichTextEditor,
  RichTextEditorProvider,
  RichTextField,
  ImageNodeAttributes,
  MenuButtonImageUpload,
} from "mui-tiptap";

import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import { Bold } from "@tiptap/extension-bold";
import { BulletList } from "@tiptap/extension-bullet-list";
import { CodeBlock } from "@tiptap/extension-code-block";
import { Color } from "@tiptap/extension-color";
import { Document } from "@tiptap/extension-document";
import { Dropcursor } from "@tiptap/extension-dropcursor";
import { FontFamily } from "@tiptap/extension-font-family";
import { Gapcursor } from "@tiptap/extension-gapcursor";
import { HardBreak } from "@tiptap/extension-hard-break";
import { Highlight } from "@tiptap/extension-highlight";
import { History } from "@tiptap/extension-history";
import { Link } from "@tiptap/extension-link";
import { ListItem } from "@tiptap/extension-list-item";
import { OrderedList } from "@tiptap/extension-ordered-list";
import { Paragraph } from "@tiptap/extension-paragraph";
import { Strike } from "@tiptap/extension-strike";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { Text } from "@tiptap/extension-text";
import { TextAlign } from "@tiptap/extension-text-align";
import { TextStyle } from "@tiptap/extension-text-style";

import Image from '@tiptap/extension-image';

import { RootState } from "@customTypes/redux/global";
import { useSelector } from "react-redux";
import axios from "axios";

import {
  FontSize,
  HeadingWithAnchor,
  LinkBubbleMenuHandler,
  ResizableImage,
} from "mui-tiptap";

export type UseExtensionsOptions = {
  placeholder?: string;
};

const CustomLinkExtension = Link.extend({
  inclusive: false,
});

export const convertBase64 = (image: File): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(image);
    fileReader.onload = () => resolve(fileReader.result?.toString() || "");
    fileReader.onerror = error => reject(error);
  });
};

export const uploadImageServer = (token: string, uuid:string, file: File): Promise<string> => {
  return new Promise<string>(async (resolve, reject) => {

    const base64 = await convertBase64(file);

    const config = {
      headers: { Authorization: `Bearer ${token}` }
    };
    
    const formData = {
      "uuid": uuid,
      "base64": base64
    };

    let { data } = await axios.post(import.meta.env.VITE_API_URL + "/imagenes", formData, config);

    let url_imagen = import.meta.env.VITE_IMAGES_URL + "/" + data.datos;

    resolve(url_imagen);

  });
};

interface Props {
  content: string
  uuid: string
}

const Editor = React.forwardRef((props: any, ref: any) => {

  const { content, uuid, ...other } = props;

  const theme = useTheme();

  const token = useSelector((state: RootState) => state.auth.token);

  return(
    <>
        <RichTextEditor
          {...other}
          ref={ref}
          content={content}
          extensions={
            [  
            StarterKit,
            CustomLinkExtension.configure({
              autolink: true,
              linkOnPaste: true,
              openOnClick: false,
            }),
            LinkBubbleMenuHandler,
            TextAlign.configure({
              types: ["heading", "paragraph", "image"],
            }),
            TextStyle,
            Color,
            FontFamily,
            FontSize,
            Highlight.configure({ multicolor: true }),
            ResizableImage,  
            TaskList,
            TaskItem.configure({
              nested: true,
            }),
            ]
          }
          renderControls={() =>
            <MenuControlsContainer>

              <MenuSelectHeading />

              <MenuSelectFontSize />

              <MenuButtonBold />

              <MenuButtonStrikethrough />

              <MenuButtonTextColor
                defaultTextColor={theme.palette.text.primary}
                swatchColors={[
                  { value: "#000000", label: "Black" },
                  { value: "#ffffff", label: "White" },
                  { value: "#888888", label: "Grey" },
                  { value: "#ff0000", label: "Red" },
                  { value: "#ff9900", label: "Orange" },
                  { value: "#ffff00", label: "Yellow" },
                  { value: "#00d000", label: "Green" },
                  { value: "#0000ff", label: "Blue" },
                ]}
              />

              <MenuButtonHighlightColor
                swatchColors={[
                  { value: "#595959", label: "Dark grey" },
                  { value: "#dddddd", label: "Light grey" },
                  { value: "#ffa6a6", label: "Light red" },
                  { value: "#ffd699", label: "Light orange" },
                  { value: "#ffff00", label: "Yellow" },
                  { value: "#99cc99", label: "Light green" },
                  { value: "#90c6ff", label: "Light blue" },
                  { value: "#8085e9", label: "Light purple" },
                ]}
              />

              <MenuButtonEditLink />

              <MenuSelectTextAlign />

              <MenuButtonOrderedList />

              <MenuButtonBulletedList />

              <MenuButtonTaskList />

              <MenuButtonCodeBlock />

              <MenuButtonImageUpload
                onUploadFiles={(files) =>
                  Promise.all(
                    files.map(async (file) => {
                      const url = await uploadImageServer(token, uuid, file);
                      return {
                        src: url,
                        alt: file.name,
                      };
                    })
                  )
                }
              />

            </MenuControlsContainer>
          }
        />
    </>
  )
})

export default Editor;