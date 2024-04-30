import { InlineSnippet } from "@/components/form/domain-configuration";
import Image from "next/image";
import { redirect } from "next/navigation";

// export default function HomePage() {
//   return (
//     <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
//       <Image
//         width={512}
//         height={512}
//         src="/logo.png"
//         alt="Platforms on Vercel"
//         className="w-48"
//       />
//       <h1 className="text-white">
//         Edit this page on{" "}
//         <InlineSnippet className="ml-2 bg-blue-900 text-blue-100">
//           app/home/page.tsx
//         </InlineSnippet>
//       </h1>
      
//     </div>
//   );
// }

"use client"
import "@/components/Home/home.css"
import "@/components/Home/AInime-Home/home-v23.css"
import "@/components/Home/AInime-Home/home-style12.css"
import "@/components/Home/css/header-updated-v2.css"
// import CharacterSheetSection from "@/components/Animations/CharacterSheet"
// import ReposerSection from "@/components/Animations/reposer";
// import { ClipLoader } from "react-spinners";
import {
  Box, Container, Stack, useMediaQuery,
  Dialog, TextField, Select, MenuItem, FormControl,
  InputLabel
} from "@mui/material";

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
} from "../../app/server/generate";

// import { VscGithubAlt } from "react-icons/vsc";
// import { FaDiscord } from "react-icons/fa";
import { useEffect, useState } from "react";
// import {
//   StyledAnimateButton, StyledTypography
// } from "@/lib/styles/home_styles";
import {
  // Select2,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImageGenerationResult } from "@/components/ImageGenerationResult";
import { WebsocketDemo } from "@/components/WebsocketDemo";
import { WebsocketDemo2 } from "@/components/WebsocketDemo2";
import { cn } from "../../lib/utils"; 
import { WebsocketDemo3 } from "@/components/WebsocketDemo3";
// import { parseAsInteger, parseAsIsoDateTime, useQueryState } from "next-usequerystate";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from 'next/link';
import Swiper from 'swiper';
import 'swiper/css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import { AlignCenter } from "lucide-react";

export default function Demo() {
  // const [seletedTab, setSelectedTab] = useQueryState("demo", {
  //   defaultValue: "Txt2img",
  // });

  const [isTop, setIsTop] = useState(0);
  useEffect(() => {
    function handleScroll() {
      const scrollTop = window.pageYOffset;
      setIsTop(scrollTop);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const swiper1 = new Swiper('.product-carousal-content .swiper', {
      loop: true,
      allowTouchMove: false,
      speed: 1200,
      spaceBetween: 30,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });

    $('.product-carousal-content ul.blog-head > li').on('click', function () {
      $('.product-carousal-content ul.blog-head > li').removeClass('active');
      let clickedIndex = $(this).index();
      swiper1.slideToLoop(clickedIndex);
      setTimeout(function () {
        let currentChild = clickedIndex + 1;
        let selector = '.product-carousal-content ul.blog-head > li:nth-child(' + currentChild + ')';
        $(selector).addClass('active');
      }, 0);
    });

  }, [])

  useEffect(() => {
    // setupJquery()
    AOS.init({
      duration: 0
    });
  }, [])



  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-10 bg-black">
      <div className="new_home_section">
        <section className="hero-section-wrapper">
          <div className="container1">
            <div className="hero-section-content">
              <h1>Welcome!<br /> Lets start creating anime.</h1>
              <p>Follow a simple 3 step process, once you get use to it let us know <br />and we will get you started on the advanced user interface.</p>
              {/* <a className="rainbow-btn">Create for Free</a> */}
            </div>
            <div className="show-mobile video-holder">
              <video id="hero-video-mobile" className="desk-view video-placeholder hero-video" autoPlay muted loop playsInline poster="" title="Make your first video with Animaker AI" style={{ borderRadius: '20px' }}>
                <source src="" type="video/mp4" />
              </video>
            </div>

          </div>
        </section>

        {/* <section className="hero-section-wrapper"> */}
        <div className="why-animaker center-content" >
          <div className="container1" >
            <div className="product-carousal-content" >
              <div className="col-md-8" align-items="center">
                <div className="show-mobile">
                </div>
                <ul id="prod-container1" className="blog-head">
                  <li className="active">Character Sheet</li>
                  <li>Reposer for Keyframes </li>
                  <li>Your video</li>
                </ul>
              </div>

              <div className="carousal-section" >
                <div className="swiper">
                  <div className="swiper-wrapper">
                    <div className="swiper-slide one">
                      <div className="tile-card">
                        <CharacterSheet2 />
                      </div>
                    </div>

                    <div className="swiper-slide three">
                      <div className="tile-card">
                        <Img2img3 />
                      </div>
                    </div>

                    <div className="swiper-slide four">
                      <div className="tile-card">
                        <ReposeIMG2 />
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

function CharacterSheet2() {
  const [prompt, setPrompt] = useState("");
  const [prompt2, setPrompt2] = useState("");
  const [loading, setLoading] = useState(false);
  const [runIds, setRunIds] = useState<string[]>([]);

  return (
    <Card className="container1">
      <CardHeader>
        ainime - Character design sheets
        <div className="text-xs text-foreground opacity-50">
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
          <Button type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button>

          <div className="grid grid-cols-2 gap-4">
            {runIds.map((runId: any, index: any) => (
              <ImageGenerationResult key={index} runId={runId} />
            ))}
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

function Img2img() {
  // const [prompt, setPrompt] = useState<File>();
  const [prompt, setPrompt] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [runId, setRunId] = useState("");
  const [status, setStatus] = useState<string>();
  const [faceFile, setFaceFile] = useState(null);
  const [styleFile, setStyleFile] = useState(null);
  const [positivePrompt, setPositivePrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('nfsw, bad quality image');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt(e.target.files[0]);

  };

  // Polling in frontend to check for the
  useEffect(() => {
    if (!runId) return;
    const interval = setInterval(() => {
      checkStatus(runId).then((res) => {
        if (res && res.status === "success") {
          console.log(res.outputs[0]?.data);
          // Depending on your workflows outputs
          setImage(res.outputs[0]?.data?.images?.[0].url ?? "");
          clearInterval(interval);
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [runId]);

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>Comfy Deploy - Scribble to Anime Girl</CardHeader>
      <CardContent>
        <form
          className="grid w-full items-center gap-1.5"
          onSubmit={(e: { preventDefault: () => void; }) => {
            e.preventDefault();
            if (loading) return;
            if (!prompt) return;

            setImage("");

            setStatus("getting url for upload");

            console.log(prompt?.type, prompt?.size);

            getUploadUrl(prompt?.type, prompt?.size).then((res) => {
              if (!res) return;

              setStatus("uploading input");

              console.log(res);

              fetch(res.upload_url, {
                method: "PUT",
                body: prompt,
                headers: {
                  "Content-Type": prompt.type,
                  "x-amz-acl": "public-read",
                  "Content-Length": prompt.size.toString(),
                },
              }).then((_res) => {
                if (_res.ok) {
                  setStatus("uploaded input");

                  setLoading(true);
                  generate_img(res.download_url).then((res) => {
                    console.log(res);
                    if (!res) {
                      setStatus("error");
                      setLoading(false);
                      return;
                    }
                    setRunId(res.run_id);
                  });
                  setStatus("preparing");
                }
              });
            });
          }}
        >
          <Label htmlFor="picture">Image prompt</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
          <Button type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button>

          {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-square" />}
        </form>
      </CardContent>
    </Card>
  );
}

// function Img2img2() {
//   // const [prompt, setPrompt] = useState<File>();
//   const [prompt, setPrompt] = useState<File | null>(null);
//   const [prompt2, setPrompt2] = useState<File | null>(null);
//   const [poseImageUrl, setPoseImageUrl] = useState(
//     "https://storage.comfydeploy.com/inputs/img_5vpXbR7ZnMSGXjCr.png",
//   );
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [runId, setRunId] = useState("");
//   const [status, setStatus] = useState<string>();
//   const [faceFile, setFaceFile] = useState(null);
//   const [styleFile, setStyleFile] = useState(null);
//   const [positivePrompt, setPositivePrompt] = useState('');
//   const [negativePrompt, setNegativePrompt] = useState('nfsw, bad quality image');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setPrompt(e.target.files[0]);

//   };
//   const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setPrompt2(e.target.files[0]);

//   };

//   const handleSelectChange = (value: keyof typeof poses) => {
//     setPoseImageUrl(poses[value].url); // Update image based on selection
//   };

//   // Polling in frontend to check for the result
//   useEffect(() => {
//     if (!runId) return;
//     const interval = setInterval(() => {
//       checkStatus(runId).then((res) => {
//         if (res && res.status === "success") {
//           console.log(res.outputs[0]?.data);
//           // Depending on your workflows outputs
//           setImage(res.outputs[1]?.data?.images?.[0].url ?? "");
//           clearInterval(interval);
//         }
//       });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [runId]);

//   return (
//     <Card className="w-full max-w-[600px]">
//       <CardHeader>Comfy Deploy - Scribble to Anime Girl</CardHeader>
//       <CardContent>
//         <form
//           className="grid w-full items-center gap-1.5"
//           onSubmit={(e: { preventDefault: () => void; }) => {
//             e.preventDefault();
//             if (loading) return;
//             if (!prompt) return;

//             setImage("");

//             setStatus("getting url for upload");

//             console.log(prompt?.type, prompt?.size);

//             getUploadUrl2(prompt?.type, prompt?.size).then((res) => {
//               if (!res) return;

//               setStatus("uploading input");

//               console.log(res);

//               fetch(res.upload_url, {
//                 method: "PUT",
//                 body: prompt,
//                 headers: {
//                   "Content-Type": prompt.type,
//                   "x-amz-acl": "public-read",
//                   "Content-Length": prompt.size.toString(),
//                 },
//               }).then((_res) => {
//                 if (_res.ok) {
//                   setStatus("uploaded input");

//                   setLoading(true);
//                   generate_repose_img(res.upload_url, res.upload_url).then((res) => {
//                     console.log(res);
//                     if (!res) {
//                       setStatus("error");
//                       setLoading(false);
//                       return;
//                     }
//                     setRunId(res.run_id);
//                   });
//                   setStatus("preparing");
//                 }
//               });
//             });
//           }}
//         >
//           {/* <Label htmlFor="picture">Set Positive Prompt</Label>
//           <Input
//             id="picture"
//             type="text"
//             value={positivePrompt}
//             onChange={(e: { target: { value: any; }; }) => setPositivePrompt(e.target.value)}
//           /> */}
//           <Label htmlFor="picture2">Image prompt</Label>
//           <Input id="picture2" type="file" onChange={handleFileChange2} />

//           <Label htmlFor="picture">Image prompt2</Label>
//           <Input id="picture" type="file" onChange={handleFileChange} />

//           <Button type="submit" className="flex gap-2" disabled={loading}>
//             Generate {loading && <LoadingIcon />}
//           </Button>



//           {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-square" />}
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

function Img2img3() {
  const [prompt, setPrompt] = useState<File>();
  const [prompt2, setPrompt2] = useState<File>();
  const [txtprompt, txtsetPrompt] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [runId, setRunId] = useState("");
  const [status, setStatus] = useState<string>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt(e.target.files[0]);
  };
  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt2(e.target.files[0]);
  };

  // Polling in frontend to check for the
  useEffect(() => {
    if (!runId) return;
    const interval = setInterval(() => {
      checkStatus(runId).then((res) => {
        if (res) setStatus(res.status);
        if (res && res.status === "success") {
          console.log(res.outputs[0]?.data);
          setImage(res.outputs[0]?.data?.images?.[0].url ?? "");
          setLoading(false);
          clearInterval(interval);
        }
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [runId]);

  return (
    <Card className="w-full max-w-[600px]">
      <CardHeader>Comfy Deploy - Scribble to Anime Girl</CardHeader>
      <CardContent>
        <form
          className="grid w-full items-center gap-1.5"
          onSubmit={(e) => {
            e.preventDefault();
            if (loading) return;
            if (!prompt) return;

            setImage("");
            setLoading(true);

            setStatus("getting url for upload");

            console.log(prompt?.type, prompt?.size);

            getUploadUrl(prompt?.type, prompt?.size).then((res) => {
              if (!res) return;

              setStatus("uploading input");

              console.log(res);

              fetch(res.upload_url, {
                method: "PUT",
                body: prompt,
                headers: {
                  "Content-Type": prompt.type,
                  "x-amz-acl": "public-read",
                  "Content-Length": prompt.size.toString(),
                },
              }).then((_res) => {
                if (_res.ok) {
                  setStatus("uploaded input");

                  setLoading(true);
                  generate_img2(res.download_url, res.download_url, txtprompt).then((res) => {
                    console.log(res);
                    if (!res) {
                      setStatus("error");
                      setLoading(false);
                      return;
                    }
                    setRunId(res.run_id);
                  });
                  setStatus("preparing");
                }
              });
            });
          }}
        >
          {/* <Label htmlFor="picture3">txt prompt</Label>
          <Input
            id="picture3"
            type="text"
            value={txtprompt}
            onChange={(e) => txtsetPrompt(e.target.value)}
          /> */}
          <Label htmlFor="picture">Image prompt</Label>
          <Input id="picture" type="file" onChange={handleFileChange} />
          <Label htmlFor="picture2">Image prompt 2</Label>
          <Input id="picture2" type="file" onChange={handleFileChange2} />
          <Button type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button>

          {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-square" />}
        </form>
      </CardContent>
    </Card>
  );
}

function ReposeIMG() {
  // const [prompt, setPrompt] = useState<File>();
  const [prompt, setPrompt] = useState<File | null>(null);
  const [prompt2, setPrompt2] = useState<File | null>(null);
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [runId, setRunId] = useState("");
  const [status, setStatus] = useState<string>();
  const [positivePrompt, setPositivePrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('nfsw, bad quality image');
  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt(e.target.files[0]);

  };

  const handleFileChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setPrompt2(e.target.files[0]);
  };

  // Polling in frontend to check for the results
  useEffect(() => {
    if (!runId) return;
  
    const interval = setInterval(() => {
      checkStatus(runId).then(res => {
        if (res) {
          setStatus(res.status); // Update status
  
          // Check if the task is successful and outputs are present
          if (res.status === "success" && res.outputs?.[0]?.data?.images?.[0]?.url) {
            const imageUrl = res.outputs[0].data.images[0].url;
            console.log(imageUrl);
            setImage(imageUrl); // Set the image URL
            setLoading(false); // Stop loading
            clearInterval(interval); // Clear interval
          }
        }
      }).catch(error => {
        console.error("Failed to check status:", error);
        setLoading(false); // Consider stopping loading or handling differently
        clearInterval(interval); // Clear interval on error too
      });
    }, 2000);
  
    return () => clearInterval(interval);
  }, [runId]);
  

  const handleUploads = async (prompt: File, prompt2: File) => {
    if (!prompt || !prompt2) {
      console.log("Both files need to be selected.");
      return;
    }
    setStatus("getting url for upload");


    try {

      // Get upload URLs for both files
      const uploadOne = await getUploadUrl(prompt.type, prompt.size);
      const uploadTwo = await getUploadUrl(prompt2.type, prompt2.size);
      setImage("");
      setStatus("uploading input images");
      // Handle potential nulls from getUploadUrl
      if (!uploadOne || !uploadTwo) {
        console.error("Failed to get one or both upload URLs.");
        setLoading(false);
        return; // Stop the process if URLs can't be obtained

      }

      console.log(prompt?.type, prompt?.size);

      // Upload both files
      const uploadResults = await Promise.all([
        uploadFile(uploadOne.upload_url, prompt),
        uploadFile(uploadTwo.upload_url, prompt2)
      ]);
      console.log(uploadResults);
      if (!uploadResults) return;


      // Check both uploads were successful
      if (uploadResults.every(res => res.ok)) {
        console.log("Both files uploaded successfully");
        // Generate image or any other action that needs both URLs
        await generate_repose_img(uploadOne.download_url, uploadTwo.download_url, positivePrompt, negativePrompt).then((res) => {
          console.log(res);
          if (!res) {
            setStatus("error");
            setLoading(false);
            return;
          }
          setRunId(res.run_id);
        });;
        setStatus("uploaded input: Success!!");
        // setRunId(res.run_id);
      } else {
        console.log("Failed to upload one or both files");
        setStatus("Failed to upload one or both files :(");
      }
    } catch (error) {
      console.error("Upload or generation error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent the default form submission
    setLoading(true);
    if (prompt && prompt2) {
      // Use the files for whatever needs to be done
      await handleUploads(prompt, prompt2); // Adjust handleUploads to accept files as arguments
    } else {
      alert("Please select both files before submitting.");
    }
  };



  return (

    <Card className="w-full">
      <CardHeader>Comfy Deploy - Scribble to Anime Girl</CardHeader>
      <CardContent>
        <form
        >
          <Label htmlFor="picture1">Positive Text Prompt</Label>
          <Input
            id="picture1"
            type="text"
            value={positivePrompt}
            onChange={(e) => setPositivePrompt(e.target.value)}
          />
          <Label htmlFor="picture3">Negative Text Prompt</Label>
          <Input
            id="picture3"
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
          <div className="slider-row">

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
                  <div className='bg-vid-container1' >
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
                    <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
                      <h2 style={{ color: 'white' }}>Choose<br /> Your Character</h2>
                      <p style={{ color: 'white' }}>Select Your character you <br />want to animate.</p>
                    </div>
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
                  <div className='bg-vid-container1' >
                    <div className='bg-vid-wrapper' >
                      {
                        prompt2 ? <img
                          src={URL.createObjectURL(prompt2)}
                          style={{
                            width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
                          }}
                          loading="lazy" alt=""
                        /> :
                          <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
                            <source src="" type="video/mp4" />
                          </video>
                      }
                    </div>
                    <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
                      <h2 style={{ color: "white" }}>Choose your<br /> character pose</h2>
                      <p style={{ color: 'white' }}>Upload an image of a pose to <br />that you want your character in</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>


          <Button onClick={handleSubmit} type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button>

          {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-square" />}
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
      <CardHeader>Comfy Deploy - Scribble to Anime Girl</CardHeader>
      <CardContent>
        <form
        >
          <Label htmlFor="picture1">Positive Text Prompt</Label>
          <Input
            id="picture1"
            type="text"
            value={positivePrompt}
            onChange={(e) => setPositivePrompt(e.target.value)}
          />
          <Label htmlFor="picture3">Negative Text Prompt</Label>
          <Input
            id="picture3"
            type="text"
            value={negativePrompt}
            onChange={(e) => setNegativePrompt(e.target.value)}
          />
          <div className="slider-row">

            {/* FaceFile SECTION HERE */}
            <div className="col-md-4">
              <input
                accept="image/jpeg, image/jpg, image/png"
                style={{ display: 'none' }}
                id="face-image1"
                type="file"
                onChange={handleFileChange}
                name="face1"
              />
              <label htmlFor="face-image1" style={{ width: "100%", cursor: "pointer" }}>
                <div className="character-builder" style={{ paddingBottom: "14px" }}>
                  <div className='bg-vid-container1' >
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
                    <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
                      <h2 style={{ color: 'white' }}>Choose<br /> Your Character</h2>
                      <p style={{ color: 'white' }}>Select Your character you <br />want to animate.</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>

            {/* Pose Section is here */}
            <div className="col-md-4">
              <input
                accept="image/jpeg, image/jpg, image/png"
                style={{ display: 'none' }}
                id="pose-image1"
                type="file"
                onChange={handleFileChange2}
                name="pose1"
              />
              <label htmlFor="pose-image1" style={{ width: "100%", cursor: "pointer" }}>
                <div className="character-builder" style={{ height: "100%", paddingBottom: "14px" }}>
                  <div className='bg-vid-container1' >
                    <div className='bg-vid-wrapper' >
                      {
                        prompt2 ? <img
                          src={URL.createObjectURL(prompt2)}
                          style={{
                            width: '100%', height: !isMediumScreen ? "420px" : "300px", borderRadius: "20px"
                          }}
                          loading="lazy" alt=""
                        /> :
                          <video autoPlay muted loop playsInline poster="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/0f0456d3-a700-4561-a7b6-246e32140b00/original=true/E3597C6E050D3C523B9788C0172F0BE029F458EE86394D0863C44058ED103FB6.jpeg" title="Character Builder" style={{ borderRadius: '20px' }}>
                            <source src="" type="video/mp4" />
                          </video>
                      }
                    </div>
                    <div className='bg-vid-content' data-aos="fade-up" style={{ height: "100%" }}>
                      <h2 style={{ color: "white" }}>Choose your<br /> character pose</h2>
                      <p style={{ color: 'white' }}>Upload an image of a pose to <br />that you want your character in</p>
                    </div>
                  </div>
                </div>
              </label>
            </div>
          </div>


          <Button onClick={handleSubmit} type="submit" className="flex gap-2" disabled={loading}>
            Generate {loading && <LoadingIcon />}
          </Button>

          {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-square" />}
        </form>

      </CardContent>
    </Card>

  );
}


const poses = {
  arms_on_hips: {
    url: "https://pub-6230db03dc3a4861a9c3e55145ceda44.r2.dev/openpose-pose%20(1).png",
    name: "Arms on Hips",
  },
  waving: {
    url: "https://pub-6230db03dc3a4861a9c3e55145ceda44.r2.dev/openpose-pose%20(2).png",
    name: "Waving",
  },
  legs_together_sideways: {
    url: "https://pub-6230db03dc3a4861a9c3e55145ceda44.r2.dev/openpose-pose%20(3).png",
    name: "Legs together, body at an angle",
  },
  excited_jump: {
    url: "https://pub-6230db03dc3a4861a9c3e55145ceda44.r2.dev/openpose-pose%20(4).png",
    name: "excited jump",
  },
  pointing_to_the_stars: {
    url: "https://pub-6230db03dc3a4861a9c3e55145ceda44.r2.dev/openpose-pose%20(5).png",
    name: "Pointing to the stars",
  },
};

// function OpenposeToImage() {
//   const [prompt, setPrompt] = useState("");
//   const [poseImageUrl, setPoseImageUrl] = useState(
//     "https://pub-6230db03dc3a4861a9c3e55145ceda44.r2.dev/openpose-pose%20(1).png",
//   );
//   const [poseLoading, setPoseLoading] = useState(false);
//   const [image, setImage] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [runId, setRunId] = useState("");
//   const [status, setStatus] = useState<string>();

//   const handleSelectChange = (value: keyof typeof poses) => {
//     setPoseImageUrl(poses[value].url); // Update image based on selection
//   };

//   // Polling in frontend to check for the
//   useEffect(() => {
//     if (!runId) return;
//     const interval = setInterval(() => {
//       checkStatus(runId).then((res) => {
//         if (res) setStatus(res.status);
//         if (res && res.status === "success") {
//           console.log(res.outputs[0]?.data);
//           setImage(res.outputs[0]?.data?.images?.[0].url ?? "");
//           setLoading(false);
//           clearInterval(interval);
//         }
//       });
//     }, 2000);
//     return () => clearInterval(interval);
//   }, [runId]);

//   return (
//     <Card className="w-full max-w-[600px]">
//       <CardHeader>
//         Comfy Deploy - Pose Creator Tool
//         <div className="text-xs text-foreground opacity-50">
//           OpenPose -{" "}
//           <a href="https://civitai.com/models/13647/super-pose-book-vol1-controlnet">
//             pose book
//           </a>
//         </div>
//       </CardHeader>
//       <CardContent>
//         <form
//           className="grid w-full items-center gap-1.5"
//           onSubmit={(e: { preventDefault: () => void; }) => {
//             if (loading) return;

//             e.preventDefault();
//             setLoading(true);
//             generate_img_with_controlnet(poseImageUrl, prompt).then((res) => {
//               console.log("here", res);
//               if (!res) {
//                 setStatus("error");
//                 setLoading(false);
//                 return;
//               }
//               setRunId(res.run_id);
//             });
//             setStatus("preparing");
//           }}
//         >
//           <Select
//             defaultValue={"Arms on Hips"}
//             onValueChange={(value: string) => {
//               handleSelectChange(value as keyof typeof poses);
//               setPoseLoading(true); // Start loading when a new pose is selected
//             }}
//           >
//             <Label htmlFor="picture">Pose</Label>
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Select a Pose" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Poses</SelectLabel>
//                 {Object.entries(poses).map(([poseName, attr]) => (
//                   <SelectItem key={poseName} value={poseName}>
//                     {attr.name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//           <Label htmlFor="picture">Image prompt</Label>
//           <Input
//             id="picture"
//             type="text"
//             value={prompt}
//             onChange={(e: { target: { value: any; }; }) => setPrompt(e.target.value)}
//           />
//           <Button type="submit" className="flex gap-2" disabled={loading}>
//             Generate {loading && <LoadingIcon />}
//           </Button>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="w-full rounded-lg relative">
//               {/* Pose Image */}
//               {poseLoading && (
//                 <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
//                   <LoadingIcon />
//                 </div>
//               )}
//               {poseImageUrl && (
//                 <img
//                   className="w-full h-full object-contain"
//                   src={poseImageUrl}
//                   alt="Selected pose"
//                   onLoad={() => setPoseLoading(false)}
//                 ></img>
//               )}
//             </div>
//             {/* <Separator
//               orientation="vertical"
//               className="border-gray-200"
//               decorative
//             /> */}
//             <div className="w-full h-full">
//               {runId && <ImageGenerationResult key={runId} runId={runId} className="aspect-[768/1152]" />}
//             </div>
//           </div>
//         </form>
//       </CardContent>
//     </Card>
//   );
// }

// Helper function to perform the file upload

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

// export default ReposeIMG;

