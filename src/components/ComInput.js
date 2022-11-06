import { useContext, useState } from 'react';
import { AuthContext } from "../contex/AuthContext";
import Button from '@mui/material/Button';
import ChatIcon from '@mui/icons-material/Chat';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { newCommentaryService } from "../services/index";
//import ReactFileSystem from 'react-file-system'
import { Upload } from "./Upload";
import { uploadFile } from "../services"; 

export const ComInput =  (servId) => {

    const { user, token } = useContext(AuthContext);
    const [commentText, setCommentText] = useState("");
    const [ error, setError] = useState("");
    const [ upFile, setUpFile ] = useState("");
    const [ path, setPath ] = useState('http://localhost:4000/uploadFile/');
    const [ dat, setDat ] = useState({});
    //const fileSystem = require("file-system");
    const handleComInput = async (e) => {
        try {
            e.preventDefault();
            const com = await newCommentaryService(servId.servId, user.info[0].email, commentText, token);            
        } catch (error) {
            setError(error);
        } finally {
            document.getElementById('comment').value='';
        }
    };

    const handleUpInput = async (e) => {
        try {
            //setUpFile(upFile.split(String.fromCharCode(92))[2]);
            let data = new FormData(e.target);
            data.append("path", path);
            setDat(...data);
            //e.target.reset();
            console.log(dat);

            //TERMINAR

            //const file = document.getElementById("file");
            //const idJob = localStorage.getItem('idJob');
            //console.log(FileSystem.root);
            //setUpFile(file[0].files[0]);
            //const upF = await uploadFile(idJob, user.info[0].id_user, path+upFile, upFile, token);
            //console.log(file);
            //console.log('upF', upF[0]);
        } catch (error) {
            setError(error);
        } finally {
            e.preventDefault();

        }
    };

 
    return (
        <div className='comInput'>
            <form className="new-tweet" onSubmit={handleUpInput}>
                <fieldset>
                    <legend>Máx 150 caracteres</legend>
                    <textarea 
                        id='comment' 
                        name="comment" 
                        rows="3" cols="55"
                        value={commentText}
                        onChange={e => setCommentText(e.target.value)}>
                    </textarea>
                </fieldset>
                <input type="file" name="file" id="file"
                onChange={e => setUpFile(e.target.value)}></input>
                <Button variant="outlined" type='submit'
                    startIcon={<CloudUploadIcon />} color="primary">
                    Subir Archivo
                </Button>
            </form>
            <div>
                <Button variant="outlined"
                    startIcon={<ChatIcon />} color="secondary" onClick={handleComInput}>
                    Comentar
                </Button>
            </div>
        </div>
    )
};