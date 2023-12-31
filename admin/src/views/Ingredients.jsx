import { useEffect } from "react";
import {
  Box,
  Divider,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Tr,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AiOutlineEllipsis } from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import moment from "moment";

import CustomTable from "../components/ui/CustomTable";
import { useDeleteIngredientMutation, useGetIngredientsQuery } from "../services/bakeryApi";
import { useDispatch, useSelector } from "react-redux";
import { setId } from "../features/idsSlice";
import { ModalContext } from "../context/ContextProvider";
import { DialogContext } from "../context/DialogContextProvider";
import Header from "../components/ui/Header";
import IngredientsModal from "../components/IngredientsModal";
import ConfirmationDialog from "../components/ConfirmationDialog";
import Pagination from "../components/ui/Pagination";

const tableHead = [
  {
    label: "Ingredient",
  },
  {
    label: "Created Date",
  },
  {
    label: "Updated Date",
  },
  {
    label: "",
  },
];

const Ingredients = () => {
  const { onOpen } = useContext(ModalContext);
  const { onOpen: onDialogOpen } = useContext(DialogContext);
  const ingredientId = useSelector((state) => state.ids.id);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const { data, isFetching } = useGetIngredientsQuery({ page, search, isQueryParams: true });
  const [deleteIngredient] = useDeleteIngredientMutation();
  const dispatch = useDispatch();
  const [subHeading, setSubHeading] = useState("");

  useEffect(() => {
    document.title = "Admin | Ingredients";

    return () => {
      document.title = "Admin";
    };
  }, []);

  const handleUpdate = (ingredientId) => {
    dispatch(setId({ id: ingredientId }));
    onOpen();
  };

  const handleDelete = (ingredientId, ingredient) => {
    setSubHeading(ingredient);
    dispatch(setId({ id: ingredientId }));
    onDialogOpen();
  };

  const onClick = () => {
    onOpen();
  };

  return (
    <>
      <IngredientsModal />
      <ConfirmationDialog
        heading="Delete Ingredient"
        subHeading={subHeading}
        deleteData={deleteIngredient}
        id={ingredientId}
      />
      <Box px={{ base: "4", xl: "32" }} mt="28">
        <Header
          heading="Ingredients"
          subHeading="Manage ingredients for your products"
          onClick={onClick}
          itemCount={data?.ingredients?.length}
          isButton
        />

        <Divider mt="2" />

        <Box mt="10">
          <Box as="div" my="5">
            <InputGroup width={"80"} size={"sm"}>
              <Input
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                borderRadius={"md"}
                placeholder="Search ingredients..."
              />
              <InputRightElement textColor={"gray.500"}>
                <BsSearch />
              </InputRightElement>
            </InputGroup>
          </Box>
          <CustomTable
            tableHead={tableHead}
            isFetching={isFetching}
            data={data?.ingredients?.length}
            label="Ingredients not found"
          >
            {data?.ingredients?.map((ingredient) => (
              <Tr key={ingredient._id}>
                <Td fontSize="sm" textColor="gray.600">
                  {ingredient.name}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(ingredient.createdAt).format("MMM Do YY")}
                </Td>
                <Td fontSize="sm" textColor="gray.600">
                  {moment(ingredient.updatedAt).format("MMM Do YY")}
                </Td>
                <Td isNumeric>
                  <Menu>
                    <MenuButton bg={"gray.100"} p={"1"} borderRadius={"md"}>
                      <AiOutlineEllipsis />
                    </MenuButton>
                    <MenuList>
                      <MenuItem fontSize="xs" onClick={() => handleUpdate(ingredient._id)}>
                        <EditIcon fontSize="sm" mr="1" />
                        Edit
                      </MenuItem>
                      <MenuItem
                        fontSize="xs"
                        onClick={() => handleDelete(ingredient._id, ingredient.name)}
                      >
                        <DeleteIcon mr="1" fontSize="sm" />
                        Delete
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Td>
              </Tr>
            ))}
          </CustomTable>
          {data?.totalPages !== 1 && data?.totalPages !== 0 && (
            <Box
              style={{
                display: "flex",
                justifyContent: "end",
                alignItems: "center",
              }}
            >
              <Pagination totalPages={data?.totalPages} setPage={setPage} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
};

export default Ingredients;
