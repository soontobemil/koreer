import React, {useState} from 'react';
import {ArrowLeft} from 'lucide-react';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    Divider,
    IconButton,
    List,
    Stack,
    TextField,
    Typography
} from '@mui/material';
import {useLocation} from "react-router-dom";


export function CommunityDetail() {
    const location = useLocation();
    const post = location.state || {};
    const [newComment, setNewComment] = useState('');

    if (!post) return <div>Loading...</div>;

    return (
        <Stack spacing={4}>
            {/* Header */}
            <Box sx={{ py: 2, borderBottom: 1, borderColor: 'divider' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <IconButton
                        // onClick={onBack}
                    >
                        <ArrowLeft />
                    </IconButton>
                    <Typography variant="h5">게시글</Typography>
                </Stack>
            </Box>

            {/* Post Content */}
            <Card>
                <CardContent>
                    <Stack spacing={3}>
                        {/* Post Header */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Typography variant="h4">{post.title}</Typography>
                            <Chip label={post.category} color="primary" />
                        </Stack>

                        {/* Author Info */}
                        <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                        >
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Avatar>{post.username[0]}</Avatar>
                                <Stack>
                                    <Typography variant="subtitle1">{post.username}</Typography>
                                    <Chip
                                        label={post.nation}
                                        size="small"
                                        variant="outlined"
                                    />
                                </Stack>
                            </Stack>
                            <Typography variant="caption" color="text.secondary">
                                {post.created_at}
                            </Typography>
                        </Stack>

                        <Divider />

                        {/* Content */}
                        <Typography variant="body1">
                            {post.content}
                        </Typography>

                        {/* Actions */}
                        {post.is_owner && (
                            <Stack direction="row" spacing={2} justifyContent="flex-end">
                                <Button variant="outlined">수정</Button>
                                <Button variant="contained" color="error">삭제</Button>
                            </Stack>
                        )}
                    </Stack>
                </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
                <CardContent>
                    <Stack spacing={3}>
                        <Typography variant="h6">댓글</Typography>

                        {/* Comment Form */}
                        <Stack spacing={2}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                placeholder="댓글을 작성해주세요"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                            />
                            <Box display="flex" justifyContent="flex-end">
                                <Button
                                    variant="contained"
                                    disabled={!newComment.trim()}
                                >
                                    등록
                                </Button>
                            </Box>
                        </Stack>

                        <Divider />

                        {/* Comments List */}
                        <List>
                            {/*{comments.map((comment) => (*/}
                            {/*    <ListItem*/}
                            {/*        key={comment.id}*/}
                            {/*        secondaryAction={*/}
                            {/*            comment.is_owner && (*/}
                            {/*                <IconButton edge="end" color="error">*/}
                            {/*                    <DeleteIcon />*/}
                            {/*                </IconButton>*/}
                            {/*            )*/}
                            {/*        }*/}
                            {/*    >*/}
                            {/*        <ListItemAvatar>*/}
                            {/*            <Avatar>{comment.username[0]}</Avatar>*/}
                            {/*        </ListItemAvatar>*/}
                            {/*        <ListItemText*/}
                            {/*            primary={*/}
                            {/*                <Stack*/}
                            {/*                    direction="row"*/}
                            {/*                    justifyContent="space-between"*/}
                            {/*                >*/}
                            {/*                    <Typography variant="subtitle2">*/}
                            {/*                        {comment.username}*/}
                            {/*                    </Typography>*/}
                            {/*                    <Typography variant="caption" color="text.secondary">*/}
                            {/*                        {comment.created_at}*/}
                            {/*                    </Typography>*/}
                            {/*                </Stack>*/}
                            {/*            }*/}
                            {/*            secondary={comment.content}*/}
                            {/*        />*/}
                            {/*    </ListItem>*/}
                            {/*))}*/}
                        </List>
                    </Stack>
                </CardContent>
            </Card>
        </Stack>
    );
}