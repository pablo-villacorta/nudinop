import base64
import io

import PIL
# from PIL import Image
from io import BytesIO
import urllib.request
import numpy as np
#import cv2


def load_media_uri(uri):
    # Separate the metadata from the image data
    head, data = uri.split(',', 1)

    # Get the file extension (gif, jpeg, png)
    file_ext = head.split(';')[0].split('/')[1]

    # Decode the image data
    plain_data = base64.b64decode(data)
    image = PIL.Image.open(io.BytesIO(plain_data))
    image = image.convert('RGB')
    image = image.resize((224, 224))
    image_np = np.array(image)

    return image_np

def load_uri(uri):
    response = urllib.request.urlopen(uri)
    img = PIL.Image.open(BytesIO(response.read()))
    img = img.convert('RGB')
    img = img.resize((224, 224))
    
    npimg = np.array(img) # 3 dim array first to dims are pixel x,y
                        # last dim is color
    return npimg

def load_generic_uri(uri):
  if uri.startswith("data:image"):
    return load_media_uri(uri)
  else:
    return load_uri(uri)