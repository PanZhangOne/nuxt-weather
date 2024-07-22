<template>
  <div>我是编辑器</div>
  <div>
    <!-- <img :src="Flower" /> -->
  </div>
  <div>
    <canvas ref="canvasRef" />
  </div>
</template>

<script setup lang="ts">
import Flower from "/test.gif";
import { ref } from "vue";

const canvasRef = ref<HTMLCanvasElement>();
const imageIndex = ref(0);
let imageDecoder: ImageDecoder;

const getDimensions = (blob: Blob) => {
  const { promise, reject, resolve } = Promise.withResolvers<{
    width: number;
    height: number;
  }>();
  const img = document.createElement("img");
  img.addEventListener("load", () => {
    // @ts-ignore
    URL.revokeObjectURL(blob);
    resolve({ width: img.naturalWidth, height: img.naturalHeight });
  });
  img.addEventListener("error", (error) => {
    reject(error);
  });
  img.src = URL.createObjectURL(blob);
  return promise;
};

const decodeImage = async (imageByteStream: ImageBufferSource) => {
  imageDecoder = new ImageDecoder({
    data: imageByteStream,
    type: "image/gif",
  });

  const imageFrame = await imageDecoder.decode({
    // 从 0 开始
    frameIndex: imageIndex.value,
  });
  const track = imageDecoder.tracks.selectedTrack;
  await renderImage(imageFrame, track);
};

// const renderImage = async (imageFrame, track) => {
//     const offscreenCtx = offscreenCanvas.current.getContext("2d");
//     offscreenCtx.drawImage(imageFrame.image, 0, 0);
//     const temp = offscreenCtx.getImageData(
//       0,
//       0,
//       offscreenCanvas.current.width,
//       offscreenCanvas.current.height
//     );
//     const ctx = canvas.current.getContext("2d");
//     ctx.putImageData(temp, 0, 0);
//     setInit(true);
//     if (track.frameCount === 1) {
//       return;
//     }
//     if (imageIndex.current + 1 >= track.frameCount) {
//       imageIndex.current = 0;
//     }
//     const nextImageFrame = await imageDecoder.current.decode({
//       frameIndex: ++imageIndex.current,
//     });
//     window.setTimeout(() => {
//       renderImage(nextImageFrame, track);
//     }, (imageFrame.image.duration / 1000) * factor.current);
//   };

const renderImage = async (
  imageFrame: ImageDecodeResult,
  track: ImageTrack | null
) => {
  const nextImageFrame = await imageDecoder.decode({
    frameIndex: imageIndex.value + 1,
  });

  setTimeout(() => {
    renderImage(nextImageFrame, track);
  }, (imageFrame.image.duration ?? 0 / 1000) * 1);
};

const run = async () => {
  const res = await fetch(Flower);
  const clone = res.clone();
  const blob = await res.blob();
  const canvas = canvasRef.value as HTMLCanvasElement;

  const { width, height } = await getDimensions(blob);
  canvas.width = width;
  canvas.height = height;
};
</script>
