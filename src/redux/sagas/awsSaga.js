import { takeEvery } from 'redux-saga/effects';
import axios from 'axios';

export default function* showsSaga() {
    yield takeEvery('UPLOAD_SINGLE', uploadSingleImage);
    // yield takeEvery('UPLOAD_MULTIPLE', uploadMultipleImage);
}

function* uploadSingleImage(action) {
    console.log('in uploadSingleImage');
    try {
        const response = yield axios.post('/api/merch-upload/merch-img-upload', action.payload, {
            headers: {
                'accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.8',
                'Content-Type': `multipart/form-data; boundary=${action.payload._boundary}`,
            }
        })
        try {
            console.log('response from post',response);
            if (200 === response.status) {
                // If file size is larger than expected.
                if (response.data.error) {
                    if ('LIMIT_FILE_SIZE' === response.data.error.code) {
                        alert('Max size: 2MB');
                    } else {
                        console.log('File type error');
                        console.log(response.data);
                        // If not the given file type
                        // alert(response.data.error);
                    }
                } else {
                    // Success
                    let fileName = response.data;
                    console.log('fileName', fileName);
                    alert('File Uploaded', '#3089cf');
                }
            }
        } catch (err) {
                // If another error
                alert(err);
        }

        // .then((response) => {
        //     if (200 === response.status) {
        //         // If file size is larger than expected.
        //         if (response.data.error) {
        //             if ('LIMIT_FILE_SIZE' === response.data.error.code) {
        //                 alert('Max size: 2MB');
        //             } else {
        //                 console.log(response.data);
        //                 // If not the given file type
        //                 alert(response.data.error);
        //             }
        //         } else {
        //             // Success
        //             let fileName = response.data;
        //             console.log('fileName', fileName);
        //             alert('File Uploaded', '#3089cf');
        //         }
        //     }
        // }).catch((error) => {
        //     // If another error
        //     alert(error);
        // });
    } catch (err) {
        console.log('error with uploding file', err);
    }
}

// function* uploadMultipleImage(action) {
//     console.log('in uploadMultipleImage');
//     try {
//         const response = yield axios.post('/api/merch-upload/multiple-file-upload', action.payload, {
//             headers: {
//                 'accept': 'application/json',
//                 'Accept-Language': 'en-US,en;q=0.8',
//                 'Content-Type': `multipart/form-data; boundary=${action.payload._boundary}`,
//             }
//         })
        
//         try {
//             if (200 === response.status) {
//                 // If file size is larger than expected.
//                 if (response.data.error) {
//                     if ('LIMIT_FILE_SIZE' === response.data.error.code) {
//                         alert('Max size: 2MB');
//                     } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
//                         alert('Max 4 images allowed');
//                     } else {
//                         // If not the given ile type
//                         alert(response.data.error);
//                     }
//                 } else {
//                     // Success
//                     let fileName = response.data;
//                     console.log('fileName', fileName);
//                     alert('File Uploaded', '#3089cf');
//                 }
//             }
//         } catch (err) {
//             // If another error
//             alert(err);
//         }

//         // .then((response) => {
//         //     console.log('res', response);
//         //     if (200 === response.status) {
//         //         // If file size is larger than expected.
//         //         if (response.data.error) {
//         //             if ('LIMIT_FILE_SIZE' === response.data.error.code) {
//         //                 alert('Max size: 2MB');
//         //             } else if ('LIMIT_UNEXPECTED_FILE' === response.data.error.code) {
//         //                 alert('Max 4 images allowed');
//         //             } else {
//         //                 // If not the given ile type
//         //                 alert(response.data.error);
//         //             }
//         //         } else {
//         //             // Success
//         //             let fileName = response.data;
//         //             console.log('fileName', fileName);
//         //             alert('File Uploaded', '#3089cf');
//         //         }
//         //     }
//         // }).catch((error) => {
//         //     // If another error
//         //     alert(error);
//         // });
//     } catch (err) {
//         console.log('error with adding shows', err);
//     }
// }