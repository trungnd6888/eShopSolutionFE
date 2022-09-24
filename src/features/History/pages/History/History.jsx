import { Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import historyApi from '../../../../api/historyApi';
import { open } from '../../../Auth/snackbarSlice';
import HistoryTable from '../../components/HistoryTable/HistoryTable';

History.propTypes = {

};

function History(props) {
    const [historyList, setHistoryList] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchHistory();
    }, []);

    const handleRemoveClick = async (historyId) => {
        try {
            await historyApi.remove(historyId);

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchHistory();
            }, 500);
        } catch (error) {
            console.log('Fail to remove history: ', error);
        }
    };

    const handleToolbarRemoveClick = (selected) => {
        try {
            selected.forEach(async (id) => {
                await historyApi.remove(id);
            });

            const actionSnackbar = open({
                status: true,
                message: 'Xoá sản phẩm thành công',
                type: 'success',
            });
            dispatch(actionSnackbar);

            setTimeout(() => {
                fetchHistory();
            }, 500);
        } catch (error) {
            console.log('Fail to remove history: ', error);
        }
    };

    const fetchHistory = async (filters) => {
        try {
            const { data } = await historyApi.getAll(filters);
            setHistoryList(data);
        } catch (error) {
            console.log('Fail to fetch: ', error);
        }
    };

    return (
        <Container>
            <Typography variant='h6' sx={{ mb: 3 }}>
                Danh sách lịch sử
            </Typography>
            <HistoryTable
                historyList={historyList}
                onRemoveClick={handleRemoveClick}
                onToolbarRemoveClick={handleToolbarRemoveClick}
            />
        </Container>
    );
}

export default History; 