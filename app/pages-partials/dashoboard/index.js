"use client";
import {
  addPost,
  deleteProductData,
  getproductData,
  updatePost,
} from "@/app/services";
import { RippleButton } from "@/components/ui/ripple-button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function DashboardPartial() {
  const [emptyInput, setEmptyInput] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [addUserData, setAddUserData] = useState({
    name: "",
    description: "",
  });
  const [editId, setEditId] = useState(null);
  const [editUserData, setEditUserData] = useState({
    name: "",
    description: "",
  });

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["fetchData"],
    queryFn: () => getproductData(),
  });

  console.log(addUserData);

  const mutationAdd = useMutation({
    mutationFn: (newPost) => addPost(newPost),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["fetchData"] });
    },
  });

  const mutationDelete = useMutation({
    mutationFn: (id) => deleteProductData(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["fetchData"] });
    },
  });

  const mutationEdit = useMutation({
      mutationFn: (data) => updatePost(editId, data),
      onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["fetchData"] });
    },
  });

  console.log(data);

  return (
    <section>
      <div>
        <h1 className="text-[30px] font-bold text-center">
          CRUD Operations Using Axios
        </h1>
      </div>

      <div className="lg:w-[800px] mx-auto mt-[20px] p-4 sm:p-6 md:p-5 bg-white rounded-2xl shadow-lg space-y-4 sm: w-[90%]">
        <h2 className="text-xl font-semibold text-center">
          {editId === null ? "Add Details" : "Edit Details"}
        </h2>

        <div className="lg:flex flex-row w-full justify-start gap-[15px] sm:flex flex-col gap[40px]">
          <div className="flex flex-col w-full space-y-1">
            <label className="text-sm font-medium">Name</label>
            <input
              type="text"
              placeholder="Enter name"
              value={editId === null ? addUserData.name : editUserData.name}
              onChange={(e) => {
                if (editId === null) {
                  setAddUserData({ ...addUserData, name: e.target.value });
                } else {
                  setEditUserData({ ...editUserData, name: e.target.value });
                }
              }}
              className={
                emptyInput && !addUserData.name
                  ? "border border-red-500 rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  : "border rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            />
          </div>

          {/* Description Input */}
          <div className="flex flex-col space-y-1 w-full">
            <label className="text-sm font-medium">Description</label>
            <input
              type="text"
              placeholder="Enter description"
              value={
                editId === null
                  ? addUserData.description
                  : editUserData.description
              }
              onChange={
                editId === null
                  ? (event) =>
                      setAddUserData({
                        ...addUserData,
                        description: event.target.value,
                      })
                  : (event) => {
                      setEditUserData({
                        ...editUserData,
                        description: event.target.value,
                      });
                    }
              }
              className={
                emptyInput && !addUserData.name
                  ? "border border-red-500 rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                  : "border rounded-[5px] p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              }
            />
          </div>
          <button
            onClick={() => {
              if (
                editId === null &&
                (!addUserData.name || !addUserData.description)
              ) {
                return setEmptyInput(true);
              }

              if (
                editId !== null &&
                (!editUserData.name || !editUserData.description)
              ) {
                return setEmptyInput(true);
              }
              setEmptyInput(false);
              {
                editId
                  ? mutationEdit.mutate(editUserData, {
                      onSuccess: () => {
                        setEditId(null);
                        setEditUserData({ name: "", description: "" });
                      },
                    })
                  : mutationAdd.mutate(addUserData, {
                      onSuccess: () =>
                        setAddUserData({ name: "", description: "" }),
                    });
              }
              setAddUserData({ name: "", description: "" });
            }}
            className="lg:w-[150px] h-[47px] mt-[20px] cursor-pointer bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition-all duration-200 md:w-[150px] sm: w-full"
          >
            {editId === null ? "Add" : mutationAdd.isPending ? "Adding..." : mutationEdit.isPending ? "updating..." : "Update"}
          </button>
        </div>
      </div>

      {isLoading ? (
        <>
          <div className="text-center pt-[40px]">Loading...</div>
        </>
      ) : (
        <div className="mx-w-[1250px] mx-auto p-4">
          <div className="flex flex-wrap justify-start gap-4">
            {data?.length > 0 &&
              data?.map((product) => {
                const { name, description, id } = product;
                return (
                  <div
                    key={id}
                    className="w-full bg-white shadow-lg rounded-2xl p-4 border border-gray-200 hover:shadow-xl transition-shadow duration-300 sm:max-w-[300px] lg:min-w-[270px] lg:max-w-[300px] "
                  >
                    <h2 className="text-2xl font-semibold text-black mb-2">
                      {name}
                    </h2>
                    <p className="text-gray mb-4">{description}</p>

                    <div className="flex justify-end gap-3">
                      <RippleButton
                        rippleColor="#ADD8E6"
                        onClick={() => {
                          setEditId(id);
                          setEditUserData(product);
                        }}
                      >
                        Edit
                      </RippleButton>
                      <button
                        onClick={() => {
                          setDeletingId(id);
                          mutationDelete.mutate(id, {
                            onSettled: () => setDeletingId(null),
                          });
                        }}
                        className="px-4 py-2 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        {deletingId === id ? "Deleting..." : "Delete"}
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </section>
  );
}

export default DashboardPartial;
