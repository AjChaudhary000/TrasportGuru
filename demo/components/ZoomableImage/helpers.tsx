export const calcDistance = (
  x1: number,
  y1: number,
  x2: number,
  y2: number,
) => {
  const dx = Math.abs(x1 - x2);
  const dy = Math.abs(y1 - y2);
  return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
};

export const calcCenter = (x1: number, y1: number, x2: number, y2: number) => {
  function middle(p1: number, p2: number) {
    return p1 > p2 ? p1 - (p1 - p2) / 2 : p2 - (p2 - p1) / 2;
  }

  return {
    x: middle(x1, x2),
    y: middle(y1, y2),
  };
};

export const maxOffset = (
  offset: number,
  windowDimension: number | undefined,
  imageDimension: number,
) => {
  const max = windowDimension && windowDimension - imageDimension;
  if (max && max >= 0) {
    return 0;
  }
  return max && offset < max ? max : offset;
};

export const calcOffsetByZoom = (
  width: number | undefined,
  height: number | undefined,
  imageWidth: number,
  imageHeight: number,
  zoom: number | null,
) => {
  if (zoom && width && height) {
    const xDiff = imageWidth * zoom - width;
    const yDiff = imageHeight * zoom - height;
    return {
      left: -xDiff / 2,
      top: -yDiff / 2,
    };
  }
};
