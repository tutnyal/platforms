// "use client"
// import {
//   Box, Container, Stack, useMediaQuery,
//   Dialog, TextField, Button, Select, MenuItem, FormControl,
//   InputLabel
// } from "@mui/material";
// import { useState } from "react";
// import { useTheme } from '@mui/material/styles';
// import {
//   StyledAnimateButton, StyledTypography
// } from "../../lib/styles/home_styles";
// import { fileToBase64 } from "../../lib/utils/helpers";
// import { ClipLoader } from "react-spinners";
// import "../Home/home.css"


// const ReposeSection = () => {
//   const [video, setVideo] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [animation, setAnimation] = useState(null);
//   const [faceFile, setFaceFile] = useState(null);
//   const [dressFile, setDressFile] = useState(null)
//   const [poseFile, setPoseFile] = useState(null)

//   //Responsive Screens
//   const theme = useTheme();
//   const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

//   const [animationError, setAnimationError] = useState(null);


//   // Advanced settings states
//   const [open, setOpen] = useState(false);
//   const [positivePrompt, setPositivePrompt] = useState('');
//   const [negativePrompt, setNegativePrompt] = useState('nfsw, bad quality image');
//   const [selectedModel, setSelectedModel] = useState('v1-5-pruned-emaonly.ckpt');

//   const handleFileChange = async (event) => {
//     if (event.target.value == "") {
//       return
//     }
//     const file = event.target.files[0];

//     if (event.target.name == "face") {
//       setFaceFile(file);
//     } else if (event.target.name == "dress") {
//       setDressFile(file);
//     } else if (event.target.name == "pose") {
//       setPoseFile(file);
//     } else if (event.target.name == "video") {
//       setVideo(file)
//     }
//   };

//   const uploadFiletoCloudinary = async (file, type) => {
//     try {
//       const base64Image = await fileToBase64(file)
//       let response = await fetch("/api/cloudinaryUpload", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json"
//         },
//         body: JSON.stringify({ base64Image: `data:image/jpeg;base64,${base64Image}`, type: type })
//       });

//       response = await response.json();

//       return { url: response.url, id: response.id }
//     }
//     catch (err) {
//       console.log("Error Occured while uploading file", err)
//     }
//   }

//   const queComfyDeploy = async (img1URL, img2URL) => {
//     let response = await fetch("/api/comfyDeploy", {
//       method: "POST",
//       body: JSON.stringify({ positivePrompt, negativePrompt, img1URL, img2URL })
//     });

//     response = await response.json();

//     return response.runID
//   }

//   const getAnimation = async (runID) => {
//     let err = ''
//     let response = await fetch(`/api/comfyDeploy?runID=${runID}`, {
//       method: "GET",
//     });
//     response = await response.json();

//     if (response.status == 400) {
//       return { url: null, err }
//     }

//     if (response.status == "failed") {
//       setAnimationError("Please provide 'jpg, png or jpeg' format image")
//       err = "Some Error"
//     }

//     setAnimation(response.animation_url);
//     return { url: response.animation_url, err }
//   };

//   const deleteCloudinaryAsset = async (id) => {
//     await fetch(`/api/cloudinaryUpload?id=${id}`, {
//       method: "DELETE"
//     });
//   }

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);

//     if (!faceFile || !dressFile || !poseFile) {
//       console.log("No file selected");
//       return;
//     }

//     const srcOne = await uploadFiletoCloudinary(faceFile, "image")
//     const srcTwo = await uploadFiletoCloudinary(dressFile, "image")
//     const srcThree = await uploadFiletoCloudinary(poseFile, "image")

//     if (video) {
//       var videoSrc = await uploadFiletoCloudinary(video, "video")
//       localStorage.setItem("video_id", videoSrc?.id)
//     }
//     localStorage.setItem("image_ids", JSON.stringify([srcOne?.id, srcTwo?.id]))

//     const runID = await queComfyDeploy(srcOne?.url, srcTwo?.url)

//     const fetchAnimationData = async () => {
//       const { url, err } = await getAnimation(runID);
//       if (!url && !err) {
//         setTimeout(fetchAnimationData, 30000);
//       } else {
//         await deleteCloudinaryAsset(JSON.stringify([srcOne?.id, srcTwo?.id]))
//         await deleteCloudinaryAsset(JSON.stringify([videoSrc?.id]))
//         setLoading(false);
//       }
//     };
//     await fetchAnimationData();
//   };

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const handleOk = () => {
//     setOpen(false);
//   };

//   return (
//     <Box style={{ marginTop: "0px" }
//     }>
//       <Container>
//         <div className="row no-gutters">

//           {/* FaceFile SECTION HERE */}
//           <div className="col-md-4">
//             <input
//               accept="image/jpeg, image/jpg, image/png"
//               style={{ display: 'none' }}
//               id="face-image"
//               type="file"
//               onChange={handleFileChange}
//               name="face"
//             />
//             <label htmlFor="face-image" style={{ width: "100%", cursor: "pointer" }}>
//               <div className="character-builder" style={{ paddingBottom: "14px" }}>
//                 <div className='bg-vid-container' >
//                   <div className='bg-vid-wrapper' >
//                     {
//                       faceFile ? <img
//                         src={URL.createObjectURL(faceFile)}
//                         style={{
//                           width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
//                         }}
//                         loading="lazy"
//                       /> :
//                         <video loading="lazy" autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/5c571840-be6f-4610-ab72-a5e76df68c01/original=true/1F762D5F81BAA22944D2C2DE4234A359DAC74C7302722E779A710C1E02A72559.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
//                           <source src="" type="video/mp4" alt="" />
//                         </video>
//                     }
//                   </div>
//                   <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
//                     <h2 style={{ color: 'white' }}>Choose<br /> Your Character</h2>
//                     <p style={{ color: 'white' }}>Select Your character you <br />want to animate.</p>
//                   </div>
//                 </div>
//               </div>
//             </label>
//           </div>

//           {/* Pose Section is here */}
//           <div className="col-md-4">
//             <input
//               accept="image/jpeg, image/jpg, image/png"
//               style={{ display: 'none' }}
//               id="pose-image"
//               type="file"
//               onChange={handleFileChange}
//               name="pose"
//             />
//             <label htmlFor="pose-image" style={{ width: "100%", cursor: "pointer" }}>
//               <div className="character-builder" style={{ height: "100%", paddingBottom: "14px" }}>
//                 <div className='bg-vid-container' >
//                   <div className='bg-vid-wrapper' >
//                     {
//                       poseFile ? <img
//                         src={URL.createObjectURL(poseFile)}
//                         style={{
//                           width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
//                         }}
//                         loading="lazy"
//                       /> :
//                         <video loading="lazy" autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
//                           <source src="" type="video/mp4" alt="" />
//                         </video>
//                     }
//                   </div>
//                   <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
//                     <h2 style={{ color: "white" }}>Choose your<br /> character pose</h2>
//                     <p style={{ color: 'white' }}>Upload an image of a pose to <br />that you want your character in</p>
//                   </div>
//                 </div>
//               </div>
//             </label>
//           </div>


//           {/* Dress Section is here */}
//           <div className="col-md-4">
//             <input
//               accept="image/jpeg, image/jpg, image/png"
//               style={{ display: 'none' }}
//               id="dress-image"
//               type="file"
//               onChange={handleFileChange}
//               name="dress"
//             />
//             <label htmlFor="dress-image" style={{ width: "100%", cursor: "pointer" }}>
//               <div className="character-builder" style={{ height: "100%", paddingBottom: "14px" }}>
//                 <div className='bg-vid-container' >
//                   <div className='bg-vid-wrapper' >
//                     {
//                       dressFile ? <img
//                         src={URL.createObjectURL(dressFile)}
//                         style={{
//                           width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
//                         }}
//                         loading="lazy"
//                       /> :
//                         <video loading="lazy" autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
//                           <source src="" type="video/mp4" alt="" />
//                         </video>
//                     }
//                   </div>
//                   <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
//                     <h2 style={{ color: "white" }}>Choose your<br /> style/Clothing</h2>
//                     <p style={{ color: 'white' }}>Upload an image of a style or <br />clothing for animation</p>
//                   </div>
//                 </div>
//               </div>
//             </label>
//           </div>


//         </div>

//         {/* Advance settings section and video length section */}
//         <Stack direction={isSmallScreen ? "column" : "row"} gap={!isMediumScreen ? "100px" : "20px"}>
//           <Box>
//             <StyledAnimateButton disabled={!faceFile || !dressFile || loading} onClick={handleSubmit} >
//               {loading ? <ClipLoader
//                 color="#9F71ED"
//                 loading={true}
//                 size={50}
//                 aria-label="Loading Spinner"
//                 data-testid="loader"
//               /> : "Create Animation"}
//             </StyledAnimateButton>
//             <div >
//               <h1 style={{ color: '#EFEFEF' }}>{animation ? "Here is your Animation" : "Your Animation will be displayed below"}</h1>
//               {(!loading && !animation) && <h2 style={{ color: '#EFEFEF' }}></h2>}
//               {loading && <h2 style={{ color: '#EFEFEF' }}>Your animation is being processed. Please wait...</h2>}
//               {animation && <h2 style={{ color: '#EFEFEF' }}>Congratulations! Your animation has been created successfully</h2>}
//             </div>
//           </Box>

//         </Stack>

//         {/* Complete video section */}
//         <div className="row" style={{ paddingBottom: "20px", background: "white", borderRadius: "20px" }}>
//           <div className="col-md-12">
//             <div className="video-templates">
//               <div className='bg-vid-container'>
//                 <div className='bg-vid-wrapper'>
//                   <video loading="lazy" autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3361789a-689c-42b2-b89e-96841ca71000/original=true/229081.jpeg" title="Video Templates" style={{ borderRadius: '20px' }}>
//                     <source src="" type="video/mp4" alt="" />
//                   </video>
//                 </div>
//               </div>
//             </div>
//             {animation &&
//               <div style={{ textAlign: "center" }} className='bg-vid-animate'>
//                 <img src={animation} style={{ width: "auto", height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px" }} loading="lazy" />
//               </div>
//             }
//           </div>
//         </div>

//         <Dialog open={open} onClose={handleClose}>
//           <div style={{ padding: '20px' }}>
//             <TextField
//               label="Positive Prompt"
//               value={positivePrompt}
//               onChange={(e) => setPositivePrompt(e.target.value)}
//               fullWidth
//               margin="normal"
//               autoComplete="off"
//             />

//             <TextField
//               label="Negative Prompt"
//               value={negativePrompt}
//               onChange={(e) => setNegativePrompt(e.target.value)}
//               fullWidth
//               margin="normal"
//               autoComplete="off"
//             />

//             <FormControl fullWidth margin="normal">
//               <InputLabel>Select Model</InputLabel>

//               <Select
//                 value={selectedModel}
//                 onChange={(e) => setSelectedModel(e.target.value)}
//                 fullWidth
//                 label="Select Model"
//               >
//                 <MenuItem value="v1-5-pruned-emaonly.ckpt">IPAdapter SDXL</MenuItem>
//               </Select>
//             </FormControl>

//             <div style={{ textAlign: 'right', marginTop: '20px' }}>
//               <Button onClick={handleClose} color="primary">
//                 Cancel
//               </Button>
//               <Button onClick={handleOk} color="primary" variant="contained">
//                 Ok
//               </Button>
//             </div>
//           </div>
//         </Dialog>
//       </Container >
//     </Box >
//   );
// };

// export default ReposeSection;
