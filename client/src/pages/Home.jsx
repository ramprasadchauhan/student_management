import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { AiOutlineEdit } from "react-icons/ai";

import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";
import { Link } from "react-router-dom";

const Home = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await fetch("api/student", {
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
  }, []);

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-3xl my-8 text-center">Student List</h1>
        <Link to="/student/create">
          <MdOutlineAddBox className="text-sky-800 text-4xl" />
        </Link>
      </div>
      <>
        <Table>
          <Table.Head>
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
                <Table.Cell>{student.name}</Table.Cell>
                <Table.Cell>{student.gender} </Table.Cell>
                <Table.Cell>{student.parentName} </Table.Cell>
                <Table.Cell>{student.acadmicYear}</Table.Cell>
                <Table.Cell>{student.schoolName}</Table.Cell>
                <Table.Cell className="flex space-x-2">
                  <Link to={`/student/edit/${student._id}`}>
                    <AiOutlineEdit className="text-sky-800 text-xl" />
                  </Link>
                  <Link to={`/student/delete/${student._id}`}>
                    <MdOutlineDelete className="text-red-600 text-xl" />
                  </Link>
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
    </div>
  );
};

export default Home;
