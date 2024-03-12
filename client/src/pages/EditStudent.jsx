import { Button, Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditStudent = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchStudentDetails = async () => {
      try {
        const response = await fetch(`/api/student/${id}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch student details. Status: ${response.status}`
          );
        }
        const data = await response.json();
        console.log(data);
        setFormData({
          name: data.name || "",
          gender: data.gender || "",
          parentName: data.parentName || "",
          acadmicYear: data.acadmicYear || "",
          schoolName: data.schoolName || "",
        }); // Set the initial state with fetched data
      } catch (error) {
        console.log("Error fetching student details", error.message);
      }
    };

    fetchStudentDetails();
  }, [id]); // Make sure to include 'id' in the dependency array

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/student/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (!response.ok) {
        throw new Error(`Failed to Edit student. Status: ${response.status}`);
      }
      const data = await response.json();
      setFormData(data);
      navigate("/");
    } catch (error) {
      console.log("error in student edit", error.message);
    }
  };
  return (
    <div className=" w-2/5 mt-10 border border-gray-100 mx-auto">
      <form className="flex p-2 flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-center">
          <Label value="Name" />
          <TextInput
            type="text"
            placeholder="student name"
            value={formData.name || ""}
            id="name"
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <Label value="Gender" />
          <TextInput
            type="text"
            placeholder="gender"
            value={formData.gender || ""}
            id="gender"
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <Label value="Parent Name" />
          <TextInput
            type="text"
            placeholder="Parent name"
            value={formData.parentName || ""}
            id="parentName"
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>

        <div className="flex gap-2 justify-between items-center">
          <Label value="Acadmic Year" />
          <TextInput
            type="number"
            placeholder="acadmic year"
            value={formData.acadmicYear || ""}
            id="acadmicYear"
            onChange={handleChange}
            className="w-[80%]"
          />
        </div>
        <div className="flex gap-2 justify-between items-center">
          <Label value="School Name" />
          <TextInput
            type="text"
            placeholder="school name"
            value={formData.schoolName || ""}
            id="schoolName"
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
