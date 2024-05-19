// "use client"
// import {
//     Box, Container, Stack, useMediaQuery,
//     Dialog, TextField, Button, Select, MenuItem, FormControl,
//     InputLabel
// } from "@mui/material";
// import { useState } from "react";
// import { useTheme } from '@mui/material/styles';
// import {
//     StyledAnimateButton, StyledTypography
// } from "../../lib/styles/home_styles";
// import { fileToBase64 } from "../../lib/utils/helpers";
// import { ClipLoader } from "react-spinners";
// import "../Home/home.css"

// import {
//     checkStatus,
//     generate,
//     generate_img,
//     generate_img_with_controlnet,
//     generate_repose_img,
//     getUploadUrl,
// } from "../../app/server/generate";


// const ReposerSection = () => {
//     const [video, setVideo] = useState(null)
//     const [loading, setLoading] = useState(false)
//     const [animation, setAnimation] = useState(null);
//     const [faceFile, setFaceFile] = useState<File | null>(null);
//     const [dressFile, setDressFile] = useState<File | null>(null);
//     const [poseFile, setPoseFile] = useState<File | null>(null);

//     //Responsive Screens
//     const theme = useTheme();
//     const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
//     const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//     const [animationError, setAnimationError] = useState(null);
//     const [image, setImage] = useState("");
//     const [runId, setRunId] = useState("");
//     const [status, setStatus] = useState<string>();

//     // Advanced settings states
//     const [open, setOpen] = useState(false);
//     const [positivePrompt, setPositivePrompt] = useState('');
//     const [negativePrompt, setNegativePrompt] = useState('nfsw, bad quality image');
//     const [selectedModel, setSelectedModel] = useState('v1-5-pruned-emaonly.ckpt');

//     const handleFileChangeFace = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (!e.target.files) return;
//         setFaceFile(e.target.files[0]);
//     };

//     // const handleFileChangeDress = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     if (!e.target.files) return;
//     //     setDressFile(e.target.files[0]);
//     // };

//     const handleFileChangePose = (e: React.ChangeEvent<HTMLInputElement>) => {
//         if (!e.target.files) return;
//         setPoseFile(e.target.files[0]);
//     };

//     async function uploadFile(uploadUrl: string, file: File): Promise<Response> {
//         return fetch(uploadUrl, {
//             method: "PUT",
//             body: file,
//             headers: {
//                 "Content-Type": file.type,
//                 "x-amz-acl": "public-read",
//                 "Content-Length": file.size.toString(),
//             },
//         });
//     }
//     // const handleFileChangeVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
//     //     if (!e.target.files) return;
//     //     setVideo(e.target.files[0]);
//     //     };

//     const handleUploads = async () => {
//         if (!poseFile || !faceFile) {
//             console.log("Both files need to be selected.");
//             return;
//         }
//         setLoading(true);

//         try {
//             // Get upload URLs for both files
//             const uploadOne = await getUploadUrl(poseFile.type, poseFile.size);
//             const uploadTwo = await getUploadUrl(faceFile.type, faceFile.size);

//             // Handle potential nulls from getUploadUrl
//             if (!uploadOne || !uploadTwo) {
//                 console.error("Failed to get one or both upload URLs.");
//                 return; // Stop the process if URLs can't be obtained
//             }
//             setStatus("uploading 2 inputs");

//             // Upload both files
//             const uploadResults = await Promise.all([
//                 uploadFile(uploadOne.upload_url, poseFile),
//                 uploadFile(uploadTwo.upload_url, faceFile)
//             ]);
//             setStatus("uploaded 2 inputs");

//             // Check if both uploads were successful
//             if (uploadResults.every(res => res.ok)) {
//                 console.log("Both files uploaded successfully");
//                 generate_repose_img(uploadOne.download_url, uploadTwo.download_url, positivePrompt, negativePrompt).then((res) => {
//                     console.log(res);

//                     if (!res) {
//                         setStatus("error");
//                         setLoading(false);
//                         return;
//                     }
//                     setRunId(res.run_id);
//                     setStatus("preparing");
//                 })
//             } else {
//                 console.log("Failed to upload one or both files");
//             }

//         } catch (error) {
//             console.error("Upload or generation error:", error);
//         }

//     };
//     handleUploads();

//     return (
//         <Box style={{ marginTop: "0px" }
//         }>
//             <Container>
//                 <div className="image-row no-gutters">
//                     {/*Box for the text fields or prompts*/}
//                     <Box>
//                         <TextField
//                             label="Positive Prompt"
//                             value={positivePrompt}
//                             onChange={(e) => setPositivePrompt(e.target.value)}
//                             fullWidth
//                             margin="normal"
//                             autoComplete="off"
//                         />

//                         <TextField
//                             label="Negative Prompt"
//                             value={negativePrompt}
//                             onChange={(e) => setNegativePrompt(e.target.value)}
//                             fullWidth
//                             margin="normal"
//                             autoComplete="off"
//                         />

//                     </Box>

//                     {/* FaceFile SECTION HERE */}
//                     <div className="col-md-4">
//                         <input
//                             accept="image/jpeg, image/jpg, image/png"
//                             style={{ display: 'none' }}
//                             id="face-image"
//                             type="file"
//                             onChange={handleFileChangeFace}
//                             name="face"
//                         />
//                         <label htmlFor="face-image" style={{ width: "100%", cursor: "pointer" }}>
//                             <div className="character-builder" style={{ paddingBottom: "14px" }}>
//                                 <div className='bg-vid-container' >
//                                     <div className='bg-vid-wrapper' >
//                                         {
//                                             faceFile ? <img
//                                                 src={URL.createObjectURL(faceFile)}
//                                                 style={{
//                                                     width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
//                                                 }}
//                                                 loading="lazy"
//                                             /> :
//                                                 <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/5c571840-be6f-4610-ab72-a5e76df68c01/original=true/1F762D5F81BAA22944D2C2DE4234A359DAC74C7302722E779A710C1E02A72559.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
//                                                     <source src="" type="video/mp4" />
//                                                 </video>
//                                         }
//                                     </div>
//                                     <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
//                                         <h2 style={{ color: 'white' }}>Choose<br /> Your Character</h2>
//                                         <p style={{ color: 'white' }}>Select Your character you <br />want to animate.</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </label>
//                     </div>

//                     {/* Pose Section is here */}
//                     <div className="col-md-4">
//                         <input
//                             accept="image/jpeg, image/jpg, image/png"
//                             style={{ display: 'none' }}
//                             id="pose-image"
//                             type="file"
//                             onChange={handleFileChangePose}
//                             name="pose"
//                         />
//                         <label htmlFor="pose-image" style={{ width: "100%", cursor: "pointer" }}>
//                             <div className="character-builder" style={{ height: "100%", paddingBottom: "14px" }}>
//                                 <div className='bg-vid-container' >
//                                     <div className='bg-vid-wrapper' >
//                                         {
//                                             poseFile ? <img
//                                                 src={URL.createObjectURL(poseFile)}
//                                                 style={{
//                                                     width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
//                                                 }}
//                                                 loading="lazy"
//                                             /> :
//                                                 <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
//                                                     <source src="" type="video/mp4" />
//                                                 </video>
//                                         }
//                                     </div>
//                                     <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
//                                         <h2 style={{ color: "white" }}>Choose your<br /> character pose</h2>
//                                         <p style={{ color: 'white' }}>Upload an image of a pose to <br />that you want your character in</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </label>
//                     </div>


//                     {/* Dress Section is here */}
//                     {/* <div className="col-md-4">
//                         <input
//                             accept="image/jpeg, image/jpg, image/png"
//                             style={{ display: 'none' }}
//                             id="dress-image"
//                             type="file"
//                             onChange={handleFileChangeDress}
//                             name="dress"
//                         />
//                         <label htmlFor="dress-image" style={{ width: "100%", cursor: "pointer" }}>
//                             <div className="character-builder" style={{ height: "100%", paddingBottom: "14px" }}>
//                                 <div className='bg-vid-container' >
//                                     <div className='bg-vid-wrapper' >
//                                         {
//                                             dressFile ? <img
//                                                 src={URL.createObjectURL(dressFile)}
//                                                 style={{
//                                                     width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
//                                                 }}
//                                                 loading="lazy"
//                                             /> :
//                                                 <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
//                                                     <source src="" type="video/mp4" />
//                                                 </video>
//                                         }
//                                     </div>
//                                     <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
//                                         <h2 style={{ color: "white" }}>Choose your<br /> style/Clothing</h2>
//                                         <p style={{ color: 'white' }}>Upload an image of a style or <br />clothing for animation</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </label>
//                     </div> */}
//                 </div>

//                 {/* <div class="slider-row"> */}
//                 {/* Submit button and the loading spinner section */}
//                 <Stack direction={isSmallScreen ? "column" : "row"} gap={!isMediumScreen ? "100px" : "20px"}>
//                     <Box>
//                         <StyledAnimateButton disabled={true} onClick={handleUploads} >
//                             {loading ? <ClipLoader
//                                 color="#9F71ED"
//                                 loading={true}
//                                 size={50}
//                                 aria-label="Loading Spinner"
//                                 data-testid="loader"
//                             /> : "Create Animation"}
//                         </StyledAnimateButton>
//                         <div >
//                             <h1 style={{ color: '#EFEFEF' }}>{animation ? "Here is your Animation" : "Your Animation will be displayed below"}</h1>
//                             {(!loading && !animation) && <h2 style={{ color: '#EFEFEF' }}></h2>}
//                             {loading && <h2 style={{ color: '#EFEFEF' }}>Your animation is being processed. Please wait...</h2>}
//                             {animation && <h2 style={{ color: '#EFEFEF' }}>Congratulations! Your animation has been created successfully</h2>}
//                         </div>
//                     </Box>
//                 </Stack>


//                 {/* Complete video section */}
//                 <div className="row" style={{ paddingBottom: "20px", background: "white", borderRadius: "20px" }}>
//                     <div className="col-md-12">
//                         <div className="video-templates">
//                             <div className='bg-vid-container'>
//                                 <div className='bg-vid-wrapper'>
//                                     <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3361789a-689c-42b2-b89e-96841ca71000/original=true/229081.jpeg" title="Video Templates" style={{ borderRadius: '20px' }}>
//                                         <source src="" type="video/mp4" />
//                                     </video>
//                                 </div>
//                             </div>
//                         </div>
//                         {animation &&
//                             <div style={{ textAlign: "center" }} className='bg-vid-animate'>
//                                 <img src={animation} style={{ width: "auto", height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px" }} loading="lazy" />
//                             </div>
//                         }
//                     </div>
//                 </div>

//                 {/* <Dialog open={open} onClose={handleClose}>
//                     <div style={{ padding: '20px' }}>
//                         <TextField
//                             label="Positive Prompt"
//                             value={positivePrompt}
//                             onChange={(e) => setPositivePrompt(e.target.value)}
//                             fullWidth
//                             margin="normal"
//                             autoComplete="off"
//                         />

//                         <TextField
//                             label="Negative Prompt"
//                             value={negativePrompt}
//                             onChange={(e) => setNegativePrompt(e.target.value)}
//                             fullWidth
//                             margin="normal"
//                             autoComplete="off"
//                         />

//                         <FormControl fullWidth margin="normal">
//                             <InputLabel>Select Model</InputLabel>

//                             <Select
//                                 value={selectedModel}
//                                 onChange={(e) => setSelectedModel(e.target.value)}
//                                 fullWidth
//                                 label="Select Model"
//                             >
//                                 <MenuItem value="v1-5-pruned-emaonly.ckpt">IPAdapter SDXL</MenuItem>
//                             </Select>
//                         </FormControl>

//                         <div style={{ textAlign: 'right', marginTop: '20px' }}>
//                             <Button onClick={handleClose} color="primary">
//                                 Cancel
//                             </Button>
//                             <Button onClick={handleOk} color="primary" variant="contained">
//                                 Ok
//                             </Button>
//                         </div>
//                     </div>
//                 </Dialog> */}
//             </Container >
//         </Box >
//     );
// };


// export default ReposerSection;
