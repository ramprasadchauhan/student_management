import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { HiOutlineExclamationCircle } from "react-icons/hi";

import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [studentIdToDelete, setStudentIdToDelete] = useState("");

  const [key, setKey] = useState(0);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("api/student/getstudents", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await res.json();
        console.log(data);
        setStudents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchStudent();
  }, [key]);
  console.log(students);

  const handleDeleteStudent = async () => {
    setShowModal(false);
    try {
      const res = await fetch(
        `/api/student/deletestudent/${studentIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        setStudents((prevStudents) =>
          prevStudents.data.filter(
            (student) => student._id !== studentIdToDelete
          )
        );
        setKey((prevKey) => prevKey + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl my-8 text-center">Student List</h1>
        <Link to="/create-student">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <>
        <Table>
          <Table.Head>
            <Table.HeadCell>Profile Photo</Table.HeadCell>
            <Table.HeadCell>Name</Table.HeadCell>
            <Table.HeadCell>Gender</Table.HeadCell>
            <Table.HeadCell>Parent Name</Table.HeadCell>
            <Table.HeadCell>Acadmic Year</Table.HeadCell>
            <Table.HeadCell>School Name</Table.HeadCell>
            <Table.HeadCell>Delete/Edit</Table.HeadCell>
          </Table.Head>
          {students?.data?.map((student) => (
            <Table.Body className="divide-y" key={student._id}>
              <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                <Table.Cell>
                  <img
                    src={student.profilePhoto}
                    alt={student.name}
                    className="w-10 h-10 object-cover bg-gray-500 rounded-full"
                  />
                </Table.Cell>
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.gender} </Table.Cell>
                <Table.Cell>{student.parentName} </Table.Cell>
                <Table.Cell>{student.acadmicYear}</Table.Cell>
                <Table.Cell>{student.schoolName}</Table.Cell>
                <Table.Cell className="flex space-x-2">
                  <Link to={`/update-student/${student._id}`}>
                    <AiOutlineEdit className="text-sky-800 text-xl" />
                  </Link>

                  <span
                    onClick={() => {
                      setShowModal(true);
                      setStudentIdToDelete(student._id);
                    }}
                    className="font-md text-red-500 hover:underline cursor-pointer"
                  >
                    <MdOutlineDelete className="text-red-600 text-xl" />
                  </span>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure, you want to delete this student?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={handleDeleteStudent}>
                Yes, I am sure
              </Button>
              <Button color="gray" onClick={() => setShowModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Home;
