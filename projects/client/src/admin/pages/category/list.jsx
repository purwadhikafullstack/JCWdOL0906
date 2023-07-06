import {
  Box,
  Button,
  Card,
  Flex,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import TableCRUD from "../../components/table";
import axios from "axios";
import { swalFailed, swalSuccess } from "../../../admin/utils";
import ModalAddCategory from "../category/modalAddCategory";
import ModalUpdateCategory from "./modalUpdateCategory";
import {useSelector} from 'react-redux';
import { AddIcon } from "@chakra-ui/icons";
import { Pagination } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";


const CategoryList = () => {
  const textColor = useColorModeValue("gray.700", "white");
  const [categories, setCategories] = useState([]);
  const modalAdd = useDisclosure();
  const modalUpdate = useDisclosure();
  const [activePage, setActivePage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [selectedCategoryId, setSelectedCategoryId] = useState(0);

  const adminId = useSelector((state)=> state.userSlice.value.id);

  const addCategory = async () => {

    try {
      const category_name = document.getElementById("category_name").value
      const image = document.getElementById("image").value
      const formData = new FormData();
      let data = {
        category_name: category_name,
        createdBy: adminId,
      }
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);
      let result = await axios.post(
        "http://localhost:8000/api/categories/",
        formData
      );
      // console.log("adminId",adminId);
      console.log(result);
      modalAdd.onClose();
      getAllCategory();
      swalSuccess(result.data.message);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const getAllCategory = async () => {
    try {
      let result = await axios.get("http://localhost:8000/api/categories" + `?page=${activePage}`);
      setCategories(result.data.data);
      setTotalPage(Math.ceil(result.data.count / 5));
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };

  const updateCategory = async (e) => {
    try {
      const category_name = document.getElementById("category_name").value
      let formData = new FormData();
      let Data = {
        category_name: category_name,
        updatedBy: adminId,
      };
      formData.append("data", JSON.stringify(data));
      formData.append("image", image);
      
      let result = await axios.patch("http://localhost:8000/api/categories/" + selectedCategoryId, formData,
      {

      }
      );

        modalUpdate.onClose();
        getAllCategory();
        swalSuccess(result.data.message);
    } catch (error) {
      console.log("error",error)
        swalFailed(error.response.data.message);
    }
  };

  const deleteCategory = async (e) => {
    try {
      let result = await axios.delete("http://localhost:8000/api/categories/" + e.target.id);
      // console.log(result)
      getAllCategory();
      swalSuccess(result.data.message);
    } catch (error) {
      swalFailed(error.response.data.message);
    }
  };
  

  // setTotalPage(Math.ceil(result.data.count / 5));
  useEffect(() => {
     getAllCategory();
  }, [activePage]);

  return (
    <>
      <Card p="0px" mt="20" maxW={{ sm: "320px", md: "100%" }}>
        <Flex direction="column">
          <Flex align="center" justify="space-between" p="22px">
            <Text fontSize="lg" color={textColor} fontWeight="bold">
              Category
            </Text>
            <Button variant="primary" maxH="30px" onClick={modalAdd.onOpen}>
              Add New
            </Button>
          </Flex>
          <Box overflow={{ sm: "scroll", lg: "hidden" }}>
            <TableCRUD
              activePage={activePage}
              menu="category"
              data={categories}
              header={["Name", "Image"]}
              dataFill={["category_name", "image"]}
              action={[
                (e) => {
                  modalAdd.onOpen();
                  getAllCategory(e);
                },
                (e) => {
                  modalUpdate.onOpen();
                  setSelectedCategoryId(e.target.id);
                },
                (e) => {
                  deleteCategory(e);
                },
              ]}
            />
          </Box>
        </Flex>
      </Card>
      <Flex justifyContent={'center'} mt={'20px'}>
          <Pagination
                    activePage={activePage}
                    totalPages={totalPage}
                    //untuk mengganti halaman
                    onPageChange={(event, pageInfo) => {
                        setActivePage(pageInfo.activePage);
                        console.log(pageInfo);
                    }}
                />
          </Flex>
      <ModalAddCategory
        Title="New Category"
        Open={modalAdd.isOpen}
        Close={modalAdd.onClose}
        Submit={() => addCategory()}
      />
      <ModalUpdateCategory
        Title="Update Category"
        Open={modalUpdate.isOpen}
        Close={modalUpdate.onClose}
        Submit={(e) => updateCategory(e)}
      />
    </>
  );
};

export default CategoryList;