import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Alert, Button, FileInput, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import { useNavigate, useParams } from "react-router-dom";
import { app } from "../firebase";

const EditStudent = () => {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const { studentId } = useParams();

  useEffect(() => {
    try {
      const fetchStudent = async () => {
        const res = await fetch(`/api/student/getonestudent/${studentId}`, {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          console.log(data.message);
          setPublishError(data.message);
          return;
        }
        if (res.ok) {
          setPublishError(null);
          setFormData(data);
        }
      };

      fetchStudent();
    } catch (error) {
      console.log(error.message);
    }
  }, [studentId]);
  console.log(formData);

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storafeRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storafeRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, profilePhoto: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/student/updatestudent/${studentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to create student. Status: ${response.status}`);
      }
      const data = await response.json();
      console.log(data);
      navigate("/");
    } catch (error) {
      console.log("error in student create", error.message);
    }
  };
  console.log(formData);
  return (
    <div className=" w-2/5 mt-10 border border-gray-100 mx-auto">
      <form className="flex p-2 flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-center">
          <Label value="Name" />
          <TextInput
            type="text"
            placeholder="student name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-teal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <Button
            type="button"
            gradientDuoTone="purpleToBlue"
            size="sm"
            outline
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className="w-16 h-16">
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                />
              </div>
            ) : (
              "Upload image"
            )}
          </Button>
        </div>
        {imageUploadError && <Alert color="failure">{imageUploadError}</Alert>}
        {formData.profilePhoto && (
          <img
            src={formData.profilePhoto}
            alt="upload"
            className="w-10 h-10 rounded-full object-cover"
          />
        )}
        <div className="flex gap-2 justify-between items-center">
          <Label value="Gender" />
          <TextInput
            type="text"
            placeholder="gender"
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <Label value="Parent Name" />
          <TextInput
            type="text"
            placeholder="Parent name"
            id="parentName"
            value={formData.parentName}
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>

        <div className="flex gap-2 justify-between items-center">
          <Label value="Acadmic Year" />
          <TextInput
            type="number"
            placeholder="acadmic year"
            id="acadmicYear"
            value={formData.acadmicYear}
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <Label value="School Name" />
          <TextInput
            type="text"
            placeholder="school name"
            id="schoolName"
            value={formData.schoolName}
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <Button
          gradientDuoTone="purpleToPink"
          className="w-[80%] ml-[20%]"
          type="submit"
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditStudent;
