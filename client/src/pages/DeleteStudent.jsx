import { Button } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteStudent = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();
  const { id } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/student/${id}`, {
        method: "DELETE",
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
        <Button
          gradientDuoTone="purpleToPink"
          className="w-[80%] ml-[20%]"
          type="submit"
        >
          Delete Student
        </Button>
      </form>
    </div>
  );
};

export default DeleteStudent;
