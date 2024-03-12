import { Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateStudent = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/student", {
        method: "POST",
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
  return (
    <div className=" w-2/5 mt-10 border border-gray-100 mx-auto">
      <form className="flex p-2 flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex gap-2 justify-between items-center">
          <Label value="Name" />
          <TextInput
            type="text"
            placeholder="student name"
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

export default CreateStudent;
