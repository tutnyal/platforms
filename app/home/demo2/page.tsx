"use client"
import "@/components/Home/home.css"
import "@/components/Home/AInime-Home/home-v23.css"
import "@/components/Home/AInime-Home/home-style12.css"
import "@/components/Home/css/header-updated-v2.css"
import { ClipLoader } from "react-spinners";
import {
  Box, Container, Stack, useMediaQuery,
  Dialog, TextField, MenuItem, FormControl,
  InputLabel
} from "@mui/material";
import {
  StyledAnimateButton, StyledTypography
} from "../../../lib/styles/home_styles";
import { useTheme } from '@mui/material/styles';
import { LoadingIcon } from "@/components/LoadingIcon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  checkStatus,
  character_Sheet,
  generate_img,
  generate_img2,
  generate_img_with_controlnet,
  generate_repose_img,
  getUploadUrl,
  getUploadUrl2
} from "../../server/generate";


import { useEffect, useState } from "react";


import { ImageGenerationResult } from "@/components/ImageGenerationResult";
import { ImageGenerationResult_sheets } from "@/components/ImageGenerationResult_sheets";

import Header from '@/components/Header'; // Import the NavMenu component
import { DemoClosedNotice } from "@/components/DemoClosedNotice"
import { getSession } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import Editor from "@/components/editor";


const Demo2 = () => {
 
  const [isTop, setIsTop] = useState(0);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('Problem');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const Problem = () => <div>
  <div className="swiper-slide one">
    <div className="tile-card">
        <div>
        <CharacterSheet2 /> 
        </div>
    </div>
</div>
</div>;
    
  //   const Problem = () => <div>
  
  
  //   <div className="swiper-slide one">
  //     <div className="tile-card">
  //     <div className="row">
  //       <ReposeIMG2/>                              
  //      </div>
                                
  //     </div>
  // </div>
                                                  
  
  
  // </div>;
  const Soultion = () => <div>
    
    <div className="swiper-slide two">
      <div className="tile-card">
      <div className="row">
        <ReposeIMG2 />                              
       </div>
      </div>
  </div>
                                                  
    
    </div>;
  const Creators = () => <div>
    <div className="swiper-slide three">
      <div className="tint">
      <div className="tile-card">
      <div className="row">
        <DemoClosedNotice />
        {/* <ReposeIMG2/>                               */}
       </div>
      </div>
      </div>
  </div>
    
    </div>

    return (
      
      <div>
      <div className="new_home_section">
        <Header />
        {/* Hero Section, Welcome text */}
        <section className="hero-section-wrapper">
        <div className="container">
            <div className="hero-section-content">
            <h1>Welcome!<br /> Lets start creating anime.</h1>
            <p>Follow a simple 3 step process, once you get use to it let us know <br />and we will get you started on the advanced user interface.</p>
            {/* <a className="rainbow-btn">Create for Free</a> */}
            </div>
            <div className="show-mobile video-holder">
            <video id="hero-video-mobile" className="desk-view video-placeholder hero-video" autoPlay muted loop playsInline poster="" title="Make your first video with Animaker AI" style={{ borderRadius: '20px' }}>
                <source src="" type="video/mp4"  />
            </video>
            </div>            
        </div>
        </section>
         

          <div className="why-animaker "> 
                      
              <div className="why-animaker-content " >

                  {/* Why Ainime explainer section */}
                  <section className="product-carousal center-content">
                      <div className="container1" >
                          <div className="product-carousal-content">
                              <div className="row" >
                                  <div className="col-md-8">
                                      <div className="show-mobile">
                                          <div id="prod-prev" className="icon-left-arrow">
                                              <img src="https://www.animaker.com/Animaker-Home/new-assets/product-icon-arrow.svg" alt=""  />
                                          </div>
                                      </div>
                                      
                                      <ul id="prod-container1" className="blog-head">
                                          <li className={activeTab === 'Problem' ? 'active' : ''} onClick={() => handleTabClick('Problem')}>Character Sheet</li>
                                          <li className={activeTab === 'Soultion' ? 'active' : ''} onClick={() => handleTabClick('Soultion')}>Image Reposer</li>
                                          <li className={activeTab === 'Creators' ? 'active' : ''} onClick={() => handleTabClick('Creators')}>Your Video</li>
                                      </ul>
                                      
                                      <div id="prod-next" className="show-mobile">
                                          <div className="icon-right-arrow">
                                              <img src="https://www.animaker.com/Animaker-Home/new-assets/product-icon-arrow.svg" alt="" className="slider-arrow" />
                                          </div>
                                      </div>
                                  </div>
                              </div>
                              
                              <div className="carousal-section" >
                                  <div className="swiper">
                                      <div className="swiper-wrapper">
                                      <div className="tab-content">
                                        {activeTab === 'Problem' && <Problem />}
                                        {activeTab === 'Soultion' && <Soultion />}
                                        {activeTab === 'Creators' && <Creators />}
                                      </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </section>


                  <section className="first-video center-content">
                      <div className="container1">
                          <div className="first-video-content">
                              <h1 >Want to do more? <br />Get inside the app!</h1>
                              {/* <Link href= "/login" className="rainbow-btn">Best app</Link> */}
                              {/* <button
                                  disabled={loading}
                                  onClick={() => {
                                    setLoading(true);
                                    signIn("github");
                                  }}
                                  className={`${
                                    loading
                                      ? "cursor-not-allowed bg-stone-50 dark:bg-stone-800"
                                      : "bg-white hover:bg-stone-50 active:bg-stone-100 dark:bg-black dark:hover:border-white dark:hover:bg-black"
                                  } group my-2 flex h-10 w-full items-center justify-center space-x-2 rounded-md border border-stone-200 transition-colors duration-75 focus:outline-none dark:border-stone-700`}
                                >
                                  {loading ? (
                                    <LoadingDots color="#A8A29E" />
                                  ) : (
                                    <>
                                      <svg
                                        className="h-4 w-4 text-black dark:text-white"
                                        aria-hidden="true"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                      </svg>
                                      <p className="text-sm font-medium text-stone-600 dark:text-stone-400">
                                        Login with GitHub
                                      </p>
                                    </>
                                  )}
                                </button> */}
                              
                          </div>
                      </div>
                  </section>

              </div>
          </div>
      </div>
  </div>
    );
}

export default Demo2;

function CharacterSheet2() {
  const [prompt, setPrompt] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [loading, setLoading] = useState(false);
  const [runIds, setRunIds] = useState<string[]>([]);
  //Responsive Screens
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Card className="w-full">
      <CardHeader>
      <h2>ainime - Character design sheets</h2>
        <div >
          Lora -{" "}
          <a href="https://civitai.com/models/368139/character-sheet">
            character sheet model source, no proper instructions - get any images to test out
          </a>
        </div>
      </CardHeader>
      <CardContent>
        <form
          className="grid w-full items-center gap-1.5"
          onSubmit={(e: { preventDefault: () => void; }) => {
            e.preventDefault();

            if (loading) return;
            setLoading(true);

            const promises = Array(2).fill(null).map(() => {
              return character_Sheet(prompt, prompt2)
                .then((res) => {
                  if (res) {
                    setRunIds((ids: any) => [...ids, res.run_id]);
                  }
                  return res;
                })
                .catch((error) => {
                  console.error(error);
                });
            });

            Promise.all(promises).finally(() => {
              setLoading(false);
            });
          }}
        >
          <Label htmlFor="picture">Positive Image prompt</Label>
          <Input
            id="picture"
            type="text"
            value={prompt}
            onChange={(e: { target: { value: any; }; }) => setPrompt(e.target.value)}
          />
          <Label htmlFor="picture2">Negative Image prompt</Label>
          <Input
            id="picture2"
            type="text2"
            value={prompt2}
            onChange={(e: { target: { value: any; }; }) => setPrompt2(e.target.value)}
          />
          {/* <Button type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button> */}
          
          <StyledAnimateButton disabled={!prompt || !prompt2 || loading} type="submit" >
              {loading ? <ClipLoader
                color="#9F71ED"
                loading={true}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> : "Create Animation"}
            </StyledAnimateButton>

            <div className="grid grid-cols-2 gap-4">
            {runIds.map((runId: any, index: any) => (
              <ImageGenerationResult_sheets key={index} runId={runId} />
            ))}
          </div>
          
        </form>
      </CardContent>
    </Card>
  );
}


function ReposeIMG2(): JSX.Element {
  const [prompt, setPrompt] = useState<File | null>(null);
  const [prompt2, setPrompt2] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [runId, setRunId] = useState('');
  const [image, setImage] = useState("");
  const [status, setStatus] = useState<string | undefined>();
  const [positivePrompt, setPositivePrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('nsfw, bad quality image');
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
  //   const files = e.target.files;
  //   if (files) setFile(files[0]);
  // };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt(e.target.files[0]);

  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt2(e.target.files[0]);
  };

  useEffect(() => {
    if (!runId) return;
  
    const interval = setInterval(async () => {
      try {
        const res = await checkStatus(runId);
        if (res) {
          setStatus(res.status);
          // if (res.status === "success" && res.outputs?.[0]?.data?.images?.[0]?.url) {
          if (res && res.status === "success") {
            // setImage(res.outputs[0].data.images[0].url);
            setLoading(false);
            setImage(res.outputs[0]?.data?.images?.[0].url ?? "");            
            clearInterval(interval);
          }
        }
      } catch (error) {
        console.error("Failed to check status:", error);
        setLoading(false);
        clearInterval(interval);
      }
    }, 2000);
  
    return () => clearInterval(interval);
  }, [runId]);

  const handleUploads = async () => {
    if (!prompt || !prompt2) {
      console.error("Both files need to be selected.");
      return;
    }
    setStatus("getting url for upload");

    try {
      const uploadOne = await getUploadUrl(prompt.type, prompt.size);
      const uploadTwo = await getUploadUrl(prompt2.type, prompt2.size);

      if (!uploadOne || !uploadTwo) {
        console.error("Failed to get one or both upload URLs.");
        setLoading(false);
        return;
      }
      setImage("");
      setStatus("getting url for upload");

      const uploadResults = await Promise.all([
        uploadFile(uploadOne.upload_url, prompt),
        uploadFile(uploadTwo.upload_url, prompt2)
      ]);

      if (uploadResults.every(res => res.ok)) {
        const generated = await generate_repose_img(uploadOne.download_url, uploadTwo.download_url, positivePrompt, negativePrompt);
        if (generated) {
          setRunId(generated.run_id);
          setStatus("Uploaded input: Success!!");
        } else {
          console.error("Image generation failed");
          setStatus("Image generation failed");
          setLoading(false);
          return;
        }
      } else {
        console.error("Failed to upload one or both files");
        setStatus("Failed to upload one or both files :(");
        setLoading(false);
        return;
      }
    } catch (error) {
      console.error("Upload or generation error:", error);
      setStatus("Upload or generation error");
    } finally {
      setLoading(false); // Ensure loading is set to false regardless of the result
    }
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();    
    await handleUploads();
    // setLoading(true);
  };

  // Component UI goes here
  return (

    <Card className="w-full">
      <CardHeader> 
      <div className="slider-row no-gutters">
        <h2>ainime - Character reposer, add your character and respose into any position</h2>
      <p>Add the image of your character on the left and the image of the pose on the right you want for your character on the right.</p>
      </div>
        </CardHeader>
      <CardContent>
        <form
        >
          
          <div className="grid w-full items-center gap-1.5">
                    {/*Box for the text fields or prompts*/}
                    <div className="row  no-gutters">
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
                    </div>

                    <div className="slider-row  no-gutters">

                    {/* FaceFile SECTION HERE */}
                    <div className="col-md-4">
                        <input
                            accept="image/jpeg, image/jpg, image/png"
                            style={{ display: 'none' }}
                            id="face-image"
                            type="file"
                            onChange={handleFileChange}
                            name="face"
                        />
                        <label htmlFor="face-image" style={{ width: "100%", cursor: "pointer" }}>
                            <div className="character-builder" style={{ paddingBottom: "14px" }}>
                                <div className='bg-vid-container' >
                                    <div className='bg-vid-wrapper' >
                                        {
                                            prompt ? <img
                                                src={URL.createObjectURL(prompt)}
                                                style={{
                                                    width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
                                                }}
                                                loading="lazy" alt=""
                                            /> :
                                                <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/5c571840-be6f-4610-ab72-a5e76df68c01/original=true/1F762D5F81BAA22944D2C2DE4234A359DAC74C7302722E779A710C1E02A72559.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
                                                    <source src="" type="video/mp4" />
                                                </video>
                                        }
                                    </div>
                                    {/* <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
                                        <h2 style={{ color: 'white' }}>Choose<br /> Your Character</h2>
                                        <p style={{ color: 'white' }}>Select Your character you <br />want to animate.</p>
                                    </div> */}
                                </div>
                            </div>
                        </label>
                    </div>

                    {/* Pose Section is here */}
                    <div className="col-md-4">
                        <input
                            accept="image/jpeg, image/jpg, image/png"
                            style={{ display: 'none' }}
                            id="pose-image"
                            type="file"
                            onChange={handleFileChange2}
                            name="pose"
                        />
                        <label htmlFor="pose-image" style={{ width: "100%", cursor: "pointer" }}>
                            <div className="character-builder" style={{ height: "100%", paddingBottom: "14px" }}>
                                <div className='bg-vid-container' >
                                    <div className='bg-vid-wrapper' >
                                        {
                                            prompt2 ? <img
                                                src={URL.createObjectURL(prompt2)}
                                                style={{
                                                    width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
                                                }}
                                                loading="lazy"
                                                alt=""
                                            /> :
                                                <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
                                                    <source src="" type="video/mp4" />
                                                </video>
                                        }
                                    </div>
                                    {/* <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
                                        <h2 style={{ color: "white" }}>Choose your<br /> character pose</h2>
                                        <p style={{ color: 'white' }}>Upload an image of a pose to <br />that you want your character in</p>
                                    </div> */}
                                </div>
                            </div>
                        </label>
                    </div>
                    </div>
                </div>
          {/* <Button onClick={handleSubmit} type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button> */}

          <StyledAnimateButton disabled={!prompt || !prompt2 || loading} type="submit" onClick={handleSubmit} >
              {loading ? <ClipLoader
                color="#9F71ED"
                loading={true}
                size={50}
                aria-label="Loading Spinner"
                data-testid="loader"
              /> : "Create Animation"}
            </StyledAnimateButton>

          {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-square" />}
        </form>

      </CardContent>
    </Card>

  );
}

async function uploadFile(uploadUrl: string, file: File): Promise<Response> {
  return fetch(uploadUrl, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
      "x-amz-acl": "public-read",
      "Content-Length": file.size.toString(),
    },
  });
}

