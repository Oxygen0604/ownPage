import React,{useState,useEffect,useRef} from "react";
import { CSSTransition } from "react-transition-group";
import { Button } from "antd";
import "./PreviewWindow.scss";

type Props = {
    url: string
    img:string
}

const PreviewWindow:React.FC<Props> = ({url,img}) => {
    const [preview,setPreview] = useState<boolean>(false);
    const previewRef = useRef<HTMLDivElement>(null);
    const openWindow = () => {
        window.open(url);
    }
    
    useEffect(() => {
        const clickOutside = (event: MouseEvent) => {
            if (previewRef.current &&!previewRef.current.contains(event.target as Node)) {
                setPreview(false);
            }
        }

        document.addEventListener('mousedown', clickOutside);
        return () => {
            document.removeEventListener('mousedown', clickOutside);
        }
    },[preview])


    return (
        <div className="preview-container">

            <div className="window" onClick={()=>{setPreview(true)}}>
                <img src={`${img}`} />
            </div>
            
            <CSSTransition
                in={preview}
                timeout={400}
                classNames="preview-window-ani"
                nodeRef={previewRef}
                unmountOnExit
            >
                <div className="preview-window"ref={previewRef}>
                    <iframe src={url} title="Preview" className="preview-iframe" />
                
                    <div className="preview-footer">
                        <Button type="primary" size="large" onClick={openWindow}>
                            打开网页
                        </Button>
                    </div>
                </div>
            </CSSTransition>
                   
        </div>
    )
}

export default PreviewWindow;