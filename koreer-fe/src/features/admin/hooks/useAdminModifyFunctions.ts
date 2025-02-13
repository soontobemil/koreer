import {AdminUser} from "@/types/adminUser";

export function useAdminModifyFunctions() {

    const handleEditUser = (user: AdminUser): void => {
        // 수정 로직 구현
        console.log('Edit user:', user);
    };

    const handleDeleteUser = (user: AdminUser): void => {
        // 삭제 로직 구현
        console.log('Delete user:', user);
    };

    return{
        handleDeleteUser, handleEditUser,

    }
}