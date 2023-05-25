import {Toast} from 'native-base';

const showToast = (
  title: string = 'Oops! Something went wrong',
  color: string = '#000',
) => {
  const id = title;

  // preventing duplication toast.
  if (!Toast.isActive(id)) {
    return Toast.show({
      style: {
        backgroundColor: color,
      },
      id,
      title,
      placement: 'top',
    });
  }
};

export default showToast;
