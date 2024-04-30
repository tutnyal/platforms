"use client"
import {
    Box, Container, Stack, useMediaQuery,
    Dialog, TextField, Button, Select, MenuItem, FormControl,
    InputLabel
} from "@mui/material";
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import {
    StyledAnimateButton, StyledTypography
} from "../../lib/styles/home_styles";
import { fileToBase64 } from "../../lib/utils/helpers";
import { ClipLoader } from "react-spinners";
import "../Home/home.css"


const CharacterSheet = () => {
    const [loading, setLoading] = useState(false)
    const [animation, setAnimation] = useState(null);


    //Responsive Screens
    const theme = useTheme();
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    const [animationError, setAnimationError] = useState(null);


    // Advanced settings states
    const [open, setOpen] = useState(true);
    const [positivePrompt, setPositivePrompt] = useState('');
    const [negativePrompt, setNegativePrompt] = useState('nfsw, bad quality image');
    const [selectedModel, setSelectedModel] = useState('v1-5-pruned-emaonly.ckpt');

    const queComfyDeploy = async () => {
        let response = await fetch("/api/comfyDeploy", {
            method: "POST",
            body: JSON.stringify({ positivePrompt, negativePrompt })
            // body: JSON.stringify({ positivePrompt, negativePrompt, img1URL, img2URL })
        });

        response = await response.json().runID;

        return response.runID
    }

    const getAnimation = async (runID) => {
        let err = ''
        let response = await fetch(`/api/comfyDeploy?runID=${runID}`, {
            method: "GET",
        });
        response = await response.json();

        if (response.status == 400) {

            return { url: null, err }
        }

        if (response.status == "failed") {

            setAnimationError("Please provide 'jpg, png or jpeg' format image")
            err = "Some Error"
        }

        setAnimation(response.animation_url);
        return { url: response.animation_url, err }
    };


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        const runID = await queComfyDeploy()

        const fetchAnimationData = async () => {
            const { url, err } = await getAnimation(runID);
            if (!url && !err) {

                setTimeout(fetchAnimationData, 30000);
            }
            else {
                setLoading(false);
            }
        };
        await fetchAnimationData();
    };

    const handleClickOpen = () => {
        setOpen(true);
    };


    return (
        <Box style={{ marginTop: "0px" }
        }>
            <Container>
                <div className="row no-gutters">

                </div>

                {/* Advance settings section and video length section */}
                <Stack direction={isSmallScreen ? "column" : "row"} gap={!isMediumScreen ? "100px" : "20px"}>

                    {/*Box for the text fields or prompts*/}
                    <Box>
                        <TextField
                            label="Positive Prompt"
                            value={positivePrompt}
                            onChange={(e) => setPositivePrompt(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                        />

                        <TextField
                            label="Negative Prompt"
                            value={negativePrompt}
                            onChange={(e) => setNegativePrompt(e.target.value)}
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                        />
                     

                    </Box>
                    {/*Box for the big ole animation button + text message on generating image*/}
                    <Box>
                        {/* <StyledAnimateButton disabled={!faceFile || !dressFile || loading} onClick={handleSubmit} > */}
                        <StyledAnimateButton onClick={handleSubmit} >
                            {loading ? <ClipLoader
                                color="#9F71ED"
                                loading={true}
                                size={50}
                                aria-label="Loading Spinner"
                                data-testid="loader"
                            /> : "Create Animation"}
                        </StyledAnimateButton>
                        <div >
                            <h1 style={{ color: '#EFEFEF' }}>{animation ? "Here is your Animation" : "Your Animation will be displayed below"}</h1>
                            {(!loading && !animation) && <h2 style={{ color: '#EFEFEF' }}></h2>}
                            {loading && <h2 style={{ color: '#EFEFEF' }}>Your animation is being processed. Please wait...</h2>}
                            {animation && <h2 style={{ color: '#EFEFEF' }}>Congratulations! Your animation has been created successfully</h2>}
                        </div>
                    </Box>

                </Stack>

                <Stack direction={isSmallScreen ? "column" : "row"} gap={!isMediumScreen ? "100px" : "20px"}>


                    {/* Complete video section */}
                    <div className="row" style={{ paddingBottom: "20px", background: "white", borderRadius: "20px" }}>
                        <div className="col-md-6">
                            <div className="video-templates">
                                <div className='bg-vid-container'>
                                    <div className='bg-vid-wrapper'>
                                        {animation &&
                                            <div >
                                                <img src={animation} style={{ width: "auto", height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px" }} loading="lazy" />
                                            </div>}
                                        {/* <video loading="lazy" autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/3361789a-689c-42b2-b89e-96841ca71000/original=true/229081.jpeg" title="Video Templates" style={{ borderRadius: '20px' }}>
                      <source src="" type="video/mp4" alt="" />
                    </video> */}
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>


                </Stack>


            </Container >
        </Box >
    );
};

export default CharacterSheet;

