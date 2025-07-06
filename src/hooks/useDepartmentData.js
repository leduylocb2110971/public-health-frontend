import { useMutation, useQuery } from "@tanstack/react-query";
import * as DepartmentService from "../services/DepartmentService"
import { handleMutationResponse } from "../utils/mutationHandlers";
import * as Message from "../components/Message/Message";
import { useState, useEffect } from "react";
export const useDepartmentData = ({
    setIsModalOpenCreate,
    setIsDrawerOpen,
    setIsModalOpenDeleteMany,
    setIsModalOpenDelete,
    setSelectedRowKeys,
    setRowSelected,
}) => {
    const [mutationResult, setMutationResult] = useState(null);
    const queryGetAllDepartments = useQuery({
        queryKey: ["getAllDepartments"],
        queryFn: DepartmentService.getAllDepartments,
        refetchOnWindowFocus: false,
        onError: (error) => {
            Message.error(error.message);
        },
    });

    const mutationCreateDepartment = useQuery({
        queryKey: ["createDepartment"],
        queryFn: DepartmentService.createDepartment,
        enabled: false, // Chỉ chạy khi gọi thủ công
        onSuccess: (data) => {
            const result = handleMutationResponse(data, {
                clearSelection: () => setRowSelected(null),
                closeModal: () => setIsModalOpenCreate(false),
                refetchQuery: queryGetAllDepartments.refetch,
            });
            setMutationResult(result);
        },
        onError: (error) => {
            setMutationResult({ success: false, message: error.message });
        }
    });

    const mutationDeleteDepartment = useMutation({
        mutationKey: ["deleteDepartment"],
        mutationFn: DepartmentService.deleteDepartment,
        onSuccess: (data) => {
            const result = handleMutationResponse(data, {
                clearSelection: () => setRowSelected(null),
                closeModal: () => setIsModalOpenDelete(false),
                refetchQuery: queryGetAllDepartments.refetch,
            });
            setMutationResult(result);
        },
        onError: (error) => {
            setMutationResult({ success: false, message: error.message });
        }
    });

    const mutationUpdateSpecialty = useMutation({
        mutationKey: ["updateDepartment"],
        mutationFn: DepartmentService.updateDepartment,
        onSuccess: (data) => {
            const result = handleMutationResponse(data, {
                clearSelection: () => setRowSelected(null),
                closeDrawer: () => setIsDrawerOpen(false),
                refetchQuery: queryGetAllDepartments.refetch,
            });
            setMutationResult(result);
        },
        onError: (error) => {
            setMutationResult({ success: false, message: error.message });
        }
    });

    const mutationDeleteManyDepartments = useMutation({
        mutationKey: ["deleteManyDepartments"],
        mutationFn: DepartmentService.deleteManyDepartments,
        onSuccess: (data) => {
            const result = handleMutationResponse(data, {
                clearSelection: () => setSelectedRowKeys([]),
                closeModal: () => setIsModalOpenDeleteMany(false),
                refetchQuery: queryGetAllDepartments.refetch,
            });
            setMutationResult(result);
        },
        onError: (error) => {
            setMutationResult({ success: false, message: error.message });
        }
    });

    // const mutationInsertManySpecialties= useMutation({
    //     mutationKey: ["insertManySpecialties"],
    //     mutationFn: SpecialtyService.insertManySpecialties,
    //     onSuccess: (data) => {
    //         const result = handleMutationResponse(data, {
    //             refetchQuery: queryGetAllSpecialties.refetch,
    //         });
    //         setMutationResult(result);
    //     },
    //     onError: (error) => {
    //         setMutationResult({ success: false, message: error.message });
    //     }
    // });
    // Hiển thị thông báo kết quả mutation
    useEffect(() => {
        if (mutationResult) {
            if (mutationResult.success) {
                Message.success(mutationResult.message);
            } else {
                Message.error(mutationResult.message);
            }
            setMutationResult(null); // Reset sau khi hiển thị
        }
    }, [mutationResult]);

    return {
        queryGetAllDepartments,
        mutationCreateDepartment,
        mutationDeleteDepartment,
        mutationUpdateSpecialty,
        mutationDeleteManyDepartments,
        // mutationInsertManySpecialties,
        
    };
};