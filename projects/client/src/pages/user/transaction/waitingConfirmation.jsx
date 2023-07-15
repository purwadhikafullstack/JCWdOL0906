import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, AvatarBadge, Badge, Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Container, Divider, Flex, FormControl, FormLabel, Grid, Heading, HStack, Image, Input, Spacer, Stack, StackDivider, Text, VStack, useDisclosure } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'
import React, { useEffect, useState } from 'react'
import { BsChevronRight } from 'react-icons/bs'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { formatDate, rupiah, swalFailed, swalSuccess, time } from '../../../helper'
import { apiRequest } from '../../../helper/api'
const WaitingConfirmation = () => {
    const { onOpen, onClose, isOpen } = useDisclosure()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [transaction, setTransaction] = useState([])
    const [userTransaction, setUserTransaction] = useState([])
    const [detailTransaction, setDetailTransaction] = useState([])
    const [code, setCode] = useState([])
    const [upload, setUpload] = useState(false)

    const getDataByStatus = async () => {
        try {
            const result = await apiRequest.get("/transaction/" + searchParams.get('status') + "/status")
            console.log(result.data.data)
            setTransaction(result.data.data)
        } catch (error) {

        }
    }

    const getDetailTransaction = async (code) => {
        try {
            const result = await apiRequest.get("/transaction/" + code + "/code")
            console.log(result.data.data)
            setUserTransaction(result.data.data.transaction)
            setDetailTransaction(result.data.data.details)
            onOpen()
        } catch (error) {

        }
    }

    const uploadBukti = async (e) => {
        console.log(e)
        try {
            let formData = new FormData()
            formData.append("image", e.files[0]);

            let result = await apiRequest.post("/transaction/" + e.id, formData);
            getDataByStatus();
            console.log(result.data.data)
            swalSuccess(result.data.message);
        } catch (error) {
            console.log(error);
            swalFailed(error.response.data.message);
        }
    };

    const jasaPengiriman = (shipping) => {
        if (shipping === 'TIKI') {
            return <Image w='80px' src='https://www.tiki.id/images/logo.png' />
        } else if (shipping === 'JNE') {
            return <Image src='https://www.jne.co.id/frontend/images/material/logo.jpg' />
        } else {
            return <Image src='https://5minvideo.id/images/Jnt-Express-Logo.png' />
        }
    }
    console.log(userTransaction)
    console.log(detailTransaction)
    useEffect(() => {
        getDataByStatus()
    }, [])
    return (
        <Container maxW='container.xl' p={5} mt={5}>
            <Card variant='outline'>
                <CardHeader>
                    <Heading size='md'>Menunggu Konfirmasi</Heading>
                </CardHeader>

                <CardBody>
                    <Stack spacing='4'>
                        <Card variant='outline'>
                            <CardBody>
                                <Grid templateColumns='repeat(2, 1fr)' gap={6}>
                                    {transaction.map(i =>
                                        <Card align='center' size={'2xl'}>
                                            <CardHeader w='100%'>
                                                <Flex >
                                                    <Heading size='md'> {i.transaction_code}</Heading>
                                                    <Spacer />
                                                    <Flex><Text color='gray'>Bayar pada &nbsp;</Text><Text as='b' color='blue.500'>{formatDate(i.updatedAt)}, {time(i.updatedAt)}</Text></Flex>
                                                </Flex>
                                            </CardHeader>
                                            <CardBody>
                                                <Stack direction='row' h='100px'>

                                                    <Center>
                                                        <Button mr={2} colorScheme='blue' onClick={() => getDetailTransaction(i.transaction_code)}>Detail</Button>
                                                    </Center>


                                                    <Divider orientation='vertical' />
                                                    <Center>
                                                        <Text> Total Pembayaran : {rupiah(i.total_price)}</Text>
                                                    </Center>

                                                </Stack>
                                            </CardBody>
                                        </Card>
                                    )}
                                </Grid>
                            </CardBody>
                        </Card>
                    </Stack>
                </CardBody>
            </Card>
            <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Detail Transaksi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack>
                            {userTransaction.map(i =>

                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>
                                        <Text> Tujuan Pengiriman : {i.address}</Text>
                                    </CardBody>
                                </Card>
                            )}
                            <Divider />

                            <Card variant='outline' bg='blue.50'>
                                {detailTransaction.map((j, index) =>
                                    <CardBody key={index}>

                                        <Flex justify='space-between' align='center'>
                                            <Box pt="4">
                                                <Stack spacing="0.5">
                                                    <Text fontWeight="medium">{j.product_name}</Text>
                                                    <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                                        {j.qty} x {rupiah(j.price)}
                                                    </Text>
                                                </Stack>
                                            </Box>
                                            <Text color={mode('gray.600', 'gray.400')} fontSize="sm">
                                                {rupiah(j.qty * j.price)}
                                            </Text>
                                        </Flex>
                                    </CardBody>
                                )}
                            </Card>



                            <Divider />
                            {userTransaction.map(i =>

                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>
                                        <Text fontWeight='600'> Ongkos Pengiriman :</Text>
                                        <Flex justify='space-between' align='center'>
                                            {jasaPengiriman(i.shipping)}
                                            <Text>{rupiah(i.shipping_cost)}</Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            )}
                            <Divider />
                            {userTransaction.map(i =>

                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>

                                        <Flex justify='space-between' align='center'>
                                            <Text fontWeight='600'> Total Pembayaran :</Text>
                                            <Text>{rupiah(i.total_price)}</Text>
                                        </Flex>
                                    </CardBody>
                                </Card>
                            )}
                            <Divider />
                            {userTransaction.map(i =>

                                <Card variant='outline' bg='blue.50'>
                                    <CardBody>
                                        <Text fontWeight='600'> Bukti Pembayaran :</Text>
                                        <Image height='120' src={process.env.REACT_APP_IMAGE_API + i.payment_receipt} />
                                    </CardBody>
                                </Card>
                            )}
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='ghost'>Secondary Action</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Container>
    )
}

export default WaitingConfirmation