export default class PiioImage {
  constructor(piioId,
    imageName,
    piioUrl,
    imageSrc,
    type,
    sizingType,
    imgVersion,
    compressionMode,
    crop,
    fitHeight) {
    this.piioId = piioId;
    this.imageName = imageName;
    this.piioUrl = piioUrl;
    this.imageSrc = imageSrc;
    this.type = type;
    this.sizingType = sizingType;
    this.imgVersion = imgVersion;
    this.compressionMode = compressionMode;
    this.crop = crop;
    this.fitHeight = fitHeight;
  }
}
