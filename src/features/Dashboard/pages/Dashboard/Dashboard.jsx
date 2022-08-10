import AdbIcon from '@mui/icons-material/Adb';
import AndroidIcon from '@mui/icons-material/Android';
import AppleIcon from '@mui/icons-material/Apple';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import { Container, Grid, Typography } from '@mui/material';
import React from 'react';
import AppConversionRates from '../../components/AppConversionRates/AppConversionRates';
import AppWidgetSummary from '../../components/AppWidgetSummary/AppWidgetSummary';
import AppTimeline from '../../components/AppTimeline/AppTimeline';
import AppNewsUpdate from '../../components/AppNewsUpdate/AppNewsUpdate';
import imageNews from '../../../../../images/profile-image.jpg';

Dashboard.propTypes = {

};

const listWidget = [
    {
        color: 'primary',
        icon: <AdbIcon />,
        quantity: 100,
        name: 'Sản phẩm'
    },
    {
        color: 'success',
        icon: <AppleIcon />,
        quantity: 587,
        name: 'Khách hàng'
    },
    {
        color: 'error',
        icon: <AndroidIcon />,
        quantity: 1232,
        name: 'Đơn hàng'
    },
    {
        color: 'warning',
        icon: <OndemandVideoIcon />,
        quantity: 98975,
        name: 'Doanh thu'
    },
];

const listChart = [
    { label: 'Italy', value: 400 },
    { label: 'Japan', value: 430 },
    { label: 'China', value: 448 },
    { label: 'Canada', value: 470 },
    { label: 'France', value: 540 },
    { label: 'Germany', value: 580 },
    { label: 'South Korea', value: 690 },
    { label: 'Netherlands', value: 1100 },
    { label: 'United States', value: 1200 },
    { label: 'United Kingdom', value: 1380 },
];

const listTimeline = [
    { color: 'primary', title: 'Trungnd vừa thêm 1 sản phẩm' },
    { color: 'success', title: 'Trungnd vừa cập nhật 1 sản phẩm' },
    { color: 'warning', title: 'Trungnd vừa thêm 1 bài viết' },
    { color: 'error', title: 'Trungnd vừa xóa 1 sản phẩm' },
    { color: 'primary', title: 'Trungnd vừa thêm 1 sản phẩm' },
    { color: 'success', title: 'Trungnd vừa cập nhật 1 sản phẩm' },
];

const listNewsUpdate = [
    { image: imageNews, title: 'Human Accountability Technician', description: 'Dynamic Brand Architect', time: 'about 4 hours ago' },
    { image: imageNews, title: 'Human Accountability Technician', description: 'Dynamic Brand Architect', time: 'about 4 hours ago' },
    { image: imageNews, title: 'Human Accountability Technician', description: 'Dynamic Brand Architect', time: 'about 4 hours ago' },
    { image: imageNews, title: 'Human Accountability Technician', description: 'Dynamic Brand Architect', time: 'about 4 hours ago' },
    { image: imageNews, title: 'Human Accountability Technician', description: 'Dynamic Brand Architect', time: 'about 4 hours ago' },
];

function Dashboard(props) {
    return (
        <Container>
            <Typography variant="h6" sx={{ mb: 2 }}>Chào, Trung Nguyễn</Typography>
            <Grid container spacing={4}>
                {
                    listWidget.map(item => (
                        <Grid key={item.quantity} item xs={12} sm={6} md={3}>
                            <AppWidgetSummary
                                name={item.name}
                                icon={item.icon}
                                color={item.color}
                                quantity={item.quantity}
                            />
                        </Grid>
                    ))
                }
                <Grid item xs={12} sm={12} md={12}>
                    <AppConversionRates
                        title="Conversion Rates"
                        subheader="(+43%) than last year"
                        chartData={listChart}
                    />
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <AppNewsUpdate list={listNewsUpdate} />
                </Grid>
                <Grid item xs={12} sm={12} md={4}>
                    <AppTimeline list={listTimeline} />
                </Grid>
            </Grid>
        </Container >
    );
}

export default Dashboard;   