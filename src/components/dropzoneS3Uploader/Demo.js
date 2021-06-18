import React, {useEffect, useMemo} from 'react';
import S3Upload from 'react-s3-uploader-multipart/s3upload'
import Dropzone, {useDropzone} from 'react-dropzone';
import PropTypes from 'prop-types'

import styles from './Demo.module.css'
import axios from 'axios';

const baseStyle = {
   flex: 1,
   display: 'flex',
   flexDirection: 'column',
   alignItems: 'center',
   justifyContent: 'flex-start',
   padding: '20px',
   height: 'fit-content',
   margin: '4em',
   borderWidth: 4,
   borderRadius: 2,
   borderColor: '#eeeeee',
   borderStyle: 'dashed',
   backgroundColor: '#fafafa',
   color: '#bdbdbd',
   outline: 'none',
   transition: 'border .24s ease-in-out',
   fontSize: '3em',
   overflow: 'hidden'
 };
 
 const activeStyle = {
   borderColor: '#2196f3'
 };
 
 const acceptStyle = {
   borderColor: '#00e676'
 };
 
 const rejectStyle = {
   borderColor: '#ff1744'
 };

function MyDropzone(props) {
  const {open, acceptedFiles, fileRejections, isDragActive, isDragAccept, isDragReject} = useDropzone({
    // Disable click and keydown behavior
    noClick: false,
    noKeyboard: false
  });
  const style = useMemo(() => ({
   ...baseStyle,
   ...(isDragActive ? activeStyle : {}),
   ...(isDragAccept ? acceptStyle : {}),
   ...(isDragReject ? rejectStyle : {})
 }), [
   isDragActive,
   isDragReject,
   isDragAccept
 ]);

   useEffect(() => {
      
   }, [acceptedFiles, fileRejections])

   return (
      <>
      <Dropzone onDrop={props.onDrop} className="dropzone" accept="image/*, application/pdf" onClick={false} >
      {({getRootProps, getInputProps, acceptedFiles, fileRejections}) => (
         <div {...getRootProps({style})}>
            <input {...getInputProps()} />
            <p className={styles.large_text}>Drag 'n' drop some files here</p>
            <button type="button" onClick={open} className={`${styles.large_text} ${styles.button}`}>
            Select Image/Pdf
            </button>
            <br />
            <h1>{acceptedFiles.length > 0? "Selected Files:": null}</h1>
            <ul>{acceptedFiles.map(file => (
                  <li key={file.path}>
                     {file.path} - {file.size} bytes
                  </li>
               ))}
            </ul>  
            <br />
            <h1>{fileRejections.length > 0? "Rejected Files:": null}</h1>
            <ul>{fileRejections.map(file => (
                  <li key={file.path}>
                     {file.path} - {file.size} bytes
                  </li>
               ))}
            </ul>
            {props.children}
         </div>
      )}
      </Dropzone>
      </>
   );
}

export default class DropzoneS3Uploader extends React.Component {
   

   static propTypes = {
      filename: PropTypes.string,
      s3Url: PropTypes.string.isRequired,
      notDropzoneProps: PropTypes.array.isRequired,
      isImage: PropTypes.func.isRequired,
      passChildrenProps: PropTypes.bool,
      uploadOnDrop: PropTypes.bool,

      imageComponent: PropTypes.func,
      fileComponent: PropTypes.func,
      progressComponent: PropTypes.func,
      errorComponent: PropTypes.func,

      children: PropTypes.oneOfType([
         PropTypes.node,
         PropTypes.func,
      ]),

      onDrop: PropTypes.func,
      onError: PropTypes.func,
      onProgress: PropTypes.func,
      onFinish: PropTypes.func,

      // Passed to react-s3-uploader
      upload: PropTypes.object.isRequired,

      // Default styles for react-dropzone
      className: PropTypes.oneOfType([
         PropTypes.string,
         PropTypes.object,
      ])
   }

   static defaultProps = {
      upload: {},
      s3Url: 'https://my-bucket.s3.amazonaws.com',
      className: 'react-dropzone-s3-uploader',
      passChildrenProps: true,
      uploadOnDrop: true,
      isImage: filename => filename && filename.match(/\.(jpeg|jpg|gif|png|svg)/i),
      notDropzoneProps: ['onFinish', 'onDrop', 's3Url', 'filename', 'host', 'upload',
                        'isImage', 'notDropzoneProps', 'uploadOnDrop']
   }

   constructor(props) {
      super(props)
      const uploadedFiles = []
      let assignmentId = new URLSearchParams(this.props.location.search).get("assignmentId")
      this.state = {
         uploadedFiles: uploadedFiles,
         selectedFiles: [],
         assignmentId: assignmentId,
         activeUpload: null
      };
   }

   componentWillMount = async () => { 
      this.setUploaderOptions(this.props);
      this._mounted = true;
   }

   componentWillUnmount = () => {
      this._mounted = false;
   }

   componentWillReceiveProps = props => this.setUploaderOptions(props)

   setUploaderOptions = props => {
      this.setState({
         uploaderOptions: Object.assign({
         signingUrl: '/s3/sign',
         contentDisposition: 'auto',
         uploadRequestHeaders: {'x-amz-acl': 'public-read'},
         onFinishS3Put: this.handleFinish,
         onProgress: this.handleProgress,
         onError: this.handleError
         }, props.upload)
      });
   }

   clearSelectedFiles = () => {
      this.setState(
         {...this.state,
         error: null,
         progress: null,
         selectedFiles: []}
      );
   }

   handleProgress = (progress, textState, file, stats) => {
      this.props.onProgress && this.props.onProgress(progress, textState, file, stats);
      
      if(this._mounted){
         this.setState({progress});
      }
   }

   handleError = err => {
      this.props.onError && this.props.onError(err);
      if(this._mounted){
         this.setState({...this.state, error: err, progress: null, activeUpload: null,
                        activeUploadOptions: null});
      }
   }

   handleFinish = (info, file) => {
      const uploadedFile = Object.assign({
         file,
         fileUrl: this.fileUrl(this.props.s3Url, info.filename)
      }, info);

      const uploadedFiles = this.state.uploadedFiles;
      uploadedFiles.push(uploadedFile);

      if(this._mounted){
         this.setState(
         {...this.state, uploadedFiles, error: null, progress: null, selectedFiles: [],
            activeUpload: null, activeUploadOptions: null},
         () => {
            this.props.onFinish && this.props.onFinish(uploadedFile);
         }
         );
      } else {
         // Even if the component isn't mounted anymore we want to call the
         // callback onFinish method even if we're not modifying the component's
         // internal state.
         this.props.onFinish && this.props.onFinish(uploadedFile);
      }
   }

   handleDrop = (files, rejectedFiles) => {
      const options = {
         files,
         ...this.state.uploaderOptions
      };
      const newState = {
         assignmentId: this.state.assignmentId,
         uploadedFiles: [
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size.png"},
            {file: {name: "cdcdc"}, fileUrl: "https://media.sproutsocial.com/uploads/2017/02/10x-featured-social-media-image-size"},
         ],
         error: null,
         progress: null,
         selectedFiles: files
      };
      this.setState(newState);

      this.props.onDrop && this.props.onDrop(files, rejectedFiles);
      if (this.props.uploadOnDrop){
         this.startFileUpload(options, newState);
      }


      // Method 2
      // files.forEach(async file => {
      //    try {
      //       const fileUrl = await uploadToS3(
      //         file,
      //         folder,
      //         this.handleProgress,
      //         this.abortUpload
      //       )
      //       this.handleFinish({fileUrl}, file)
      //     } catch (error) {
      //       console.log(error)
      //     }
      // })
      
   }

   startFileUpload = (files=null, state=null) => {
      console.log("called startFileUpload")
      const options = {
         files: files !== null ? files: this.state.selectedFiles,
         ...this.state.uploaderOptions
      };

      this.setState({
         ...this.state,
         ...state,
         activeUploadOptions: options,
         activeUpload: new S3Upload(options)
      });
   }

   abortUpload = (filenames=null) => {
      if (!this.state.activeUpload){
         return;
      }
      if (filenames){
         for (let i=0; i < filenames.length; i++) {
         this.state.activeUpload.abortUpload(filenames[i]);
         }
      } else {
         this.state.activeUpload.abortUpload();
      }
   }

   fileUrl = (s3Url, filename) => `${s3Url.endsWith('/') ? s3Url.slice(0, -1) : s3Url}/${filename}`

   renderImage = ({uploadedFile}) => (<div className={"rdsu-image"}><img src={uploadedFile.fileUrl} className={styles.image}/></div>)

   renderFile = ({uploadedFile}) => (
      <div className="rdsu-file">
         <div className="rdsu-file-icon"><span className="fa fa-file-o" style={{fontSize: '50px'}} /></div>
         <div className="rdsu-filename">{uploadedFile.file.name}</div>
      </div>
   )

   renderProgress = ({progress}) => (progress ? (<div className="rdsu-progress">{progress}</div>) : null)

   renderError = ({error}) => (error ? (<div className="rdsu-error small">{error}</div>) : null)

   render() {
      const {
         s3Url,
         passChildrenProps,
         children,
         imageComponent,
         fileComponent,
         progressComponent,
         errorComponent,
         ...dropzoneProps
      } = this.props

      const ImageComponent = imageComponent || this.renderImage
      const FileComponent = fileComponent || this.renderFile
      const ProgressComponent = progressComponent || this.renderProgress
      const ErrorComponent = errorComponent || this.renderError

      const {uploadedFiles} = this.state
      const childProps = {s3Url, ...this.state}
      this.props.notDropzoneProps.forEach(prop => delete dropzoneProps[prop])

      let content = (
         <div className={styles.file_container}>
            {uploadedFiles.map(uploadedFile => {
               const props = {
               key: uploadedFile.filename,
               uploadedFile: uploadedFile,
               ...childProps
               }
               return this.props.isImage(uploadedFile.fileUrl) ?
               (<ImageComponent  {...props} />) :
               (<FileComponent {...props} />)
            })}
            <ProgressComponent {...childProps} />
            <ErrorComponent {...childProps} />
         </div>
         )

      return (
         <MyDropzone onDrop={this.handleDrop} >
            {content}
         </MyDropzone>
      )
   }
}