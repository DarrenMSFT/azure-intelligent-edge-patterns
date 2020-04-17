import {
  AddCapturedImageAction,
  ADD_CAPTURED_IMAGE,
  PartThunk,
  UpdateCapturedImageAction,
  UPDATE_CAPTURED_IMAGES,
  UpdateImageLabelAction,
  UPDATE_IMAGE_LABEL,
  LabelImage,
} from './partTypes';

export const addCapturedImages = (newCapturedImage: LabelImage): AddCapturedImageAction => ({
  type: ADD_CAPTURED_IMAGE,
  payload: { newCapturedImage },
});

export const updateCapturedImages = (capturedImages: LabelImage[]): UpdateCapturedImageAction => ({
  type: UPDATE_CAPTURED_IMAGES,
  payload: { capturedImages },
});

export const thunkAddCapturedImages = (streamId: string): PartThunk => async (dispatch): Promise<void> => {
  fetch(`/api/streams/${streamId}/capture`)
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 'ok') {
        dispatch(addCapturedImages(data.image));
      }
      return null;
    })
    .catch((err) => {
      console.error(err);
    });
};

export const updateImageLabels = (imageId: number, labels: any): UpdateImageLabelAction => ({
  type: UPDATE_IMAGE_LABEL,
  payload: { id: imageId, labels },
});

export const thunkGetCapturedImages = (partId: string): PartThunk => async (dispatch): Promise<void> => {
  fetch(`/api/images`)
    .then((response) => response.json())
    .then((data) => {
      const imagesWithRelatedPart = data.reduce((acc, cur) => {
        if (cur.part.split('/')[5] === partId) acc.push(cur);
        return acc;
      }, []);
      dispatch(updateCapturedImages(imagesWithRelatedPart));
      return null;
    })
    .catch((err) => {
      console.error(err);
    });
};
