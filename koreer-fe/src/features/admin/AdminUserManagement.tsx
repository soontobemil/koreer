import {useState} from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import {DataGrid, GridColDef, GridRenderCellParams} from '@mui/x-data-grid';
import {Delete, Edit, Visibility} from '@mui/icons-material';
import {motion} from 'framer-motion';

// 타입 정의
interface User {
  id: number;
  user_email: string;
  username: string;
  nation: string;
  is_active: 'Y' | 'N';
  is_email_verified: 'Y' | 'N';
  role: string;
  created_at: string;
  updated_at?: string;
  password?: string; // API 응답에서는 제외될 수 있음
}

// 칩 상태에 대한 타입
type ChipStatus = {
  label: string;
  color: 'success' | 'error' | 'warning' | 'primary' | 'default';
};

// 칩 상태 매핑을 위한 타입
type StatusMapping = {
  [key: string]: ChipStatus;
};

export function AdminUserManagement() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);

  // 상태 매핑 객체
  const activeStatusMap: StatusMapping = {
    'Y': { label: '활성', color: 'success' },
    'N': { label: '비활성', color: 'error' }
  };

  const verificationStatusMap: StatusMapping = {
    'Y': { label: '인증됨', color: 'success' },
    'N': { label: '미인증', color: 'warning' }
  };

  // 더미 데이터
  const users: User[] = [
    {
      id: 1,
      user_email: 'user1@example.com',
      username: '홍길동',
      nation: 'KOR',
      is_active: 'Y',
      is_email_verified: 'Y',
      role: 'user',
      created_at: '2024-02-12 10:00:00',
    },
    // ... 더 많은 사용자 데이터
  ];

  const columns: GridColDef[] = [
    { field: 'username', headerName: '사용자명', flex: 1 },
    { field: 'user_email', headerName: '이메일', flex: 1.5 },
    {
      field: 'nation',
      headerName: '국가',
      width: 120,
      renderCell: (params: GridRenderCellParams<User, string>) => (
          <Chip
              label={params.value}
              color={params.value === 'KOR' ? 'primary' : 'default'}
              size="small"
          />
      )
    },
    {
      field: 'is_active',
      headerName: '활성화',
      width: 100,
      renderCell: (params: GridRenderCellParams<User, 'Y' | 'N'>) => {
        // @ts-ignore
        const status = activeStatusMap[params.value];
        return (
            <Chip
                label={status.label}
                color={status.color}
                size="small"
            />
        );
      }
    },
    {
      field: 'is_email_verified',
      headerName: '이메일 인증',
      width: 120,
      renderCell: (params: GridRenderCellParams<User, 'Y' | 'N'>) => {
        // @ts-ignore
        const status = verificationStatusMap[params.value];
        return (
            <Chip
                label={status.label}
                color={status.color}
                size="small"
            />
        );
      }
    },
    { field: 'role', headerName: '권한', width: 120 },
    { field: 'created_at', headerName: '가입일', width: 180 },
    {
      field: 'actions',
      headerName: '관리',
      width: 150,
      renderCell: (params: GridRenderCellParams<User>) => (
          <Box>
            <IconButton
                size="small"
                onClick={() => handleViewUser(params.row)}
                color="primary"
            >
              <Visibility />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => handleEditUser(params.row)}
                color="secondary"
            >
              <Edit />
            </IconButton>
            <IconButton
                size="small"
                onClick={() => handleDeleteUser(params.row)}
                color="error"
            >
              <Delete />
            </IconButton>
          </Box>
      ),
    },
  ];

  const handleViewUser = (user: User): void => {
    setSelectedUser(user);
    setOpenDialog(true);
  };

  const handleEditUser = (user: User): void => {
    // 수정 로직 구현
    console.log('Edit user:', user);
  };

  const handleDeleteUser = (user: User): void => {
    // 삭제 로직 구현
    console.log('Delete user:', user);
  };

  return (
      <Container maxWidth="lg">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
          <Typography variant="h4" sx={{ mb: 4 }}>사용자 관리</Typography>

          <Card>
            <CardContent>
              <Box sx={{ height: 600 }}>
                <DataGrid<User>
                    rows={users}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 10,
                        },
                      },
                    }}
                    pageSizeOptions={[10, 25, 50]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                      '& .MuiDataGrid-cell:focus': {
                        outline: 'none',
                      },
                    }}
                />
              </Box>
            </CardContent>
          </Card>

          <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              maxWidth="sm"
              fullWidth
          >
            <DialogTitle>사용자 상세 정보</DialogTitle>
            <DialogContent dividers>
              {selectedUser && (
                  <Box sx={{ p: 2 }}>
                    <TextField
                        label="사용자명"
                        value={selectedUser.username}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="이메일"
                        value={selectedUser.user_email}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="국가"
                        value={selectedUser.nation}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="권한"
                        value={selectedUser.role}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                    <TextField
                        label="가입일"
                        value={selectedUser.created_at}
                        fullWidth
                        margin="normal"
                        InputProps={{ readOnly: true }}
                    />
                  </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>닫기</Button>
            </DialogActions>
          </Dialog>
        </motion.div>
      </Container>
  );
}