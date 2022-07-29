import {
	Box,
	Flex,
	Text,
	IconButton,
	Button,
	Stack,
	useColorModeValue,
	useBreakpointValue,
	Container,
	Heading,
	Menu,
	MenuButton,
	MenuList,
	MenuItem,
} from "@chakra-ui/react";
import { useWallet } from "use-wallet";

import Web3 from "web3";
import NextLink from "next/link";
import DarkModeSwitch from "./DarkModeSwitch";
import { ChevronDownIcon } from "@chakra-ui/icons";

export default function NavBar() {
	const wallet = useWallet();
	// if (typeof window.ethereum !== "undefined") {
	// 	console.log("MetaMask is installed!");
	// }
	let web3;
	if (typeof window !== "undefined") {
		web3 = new Web3(window.ethereum);
	}

	const switchNetwork = async (chainId) => {
		const currentChainId = await getNetworkId();

		if (currentChainId !== chainId) {
			try {
				await web3.currentProvider
					.request({
						method: "wallet_switchEthereumChain",
						params: [{ chainId: Web3.utils.toHex(chainId) }],
					})
					.then(() => {
						wallet.connect();
					});
			} catch (switchError) {
				// This error code indicates that the chain has not been added to MetaMask.
				if (switchError.code === 4902) {
					alert("add this chain id");
				}
			}
		} else {
			wallet.connect();
		}
	};

	const getNetworkId = async () => {
		const currentChainId = await web3.eth.net.getId();
		return currentChainId;
	};

	return (
		<Box>
			<Flex
				color={useColorModeValue("gray.600", "white")}
				py={{ base: 2 }}
				px={{ base: 4 }}
				borderBottom={1}
				borderStyle={"solid"}
				borderColor={useColorModeValue("gray.200", "gray.900")}
				align={"center"}
				pos="fixed"
				top="0"
				w={"full"}
				minH={"60px"}
				boxShadow={"sm"}
				zIndex="999"
				justify={"center"}
				css={{
					backdropFilter: "saturate(180%) blur(5px)",
					backgroundColor: useColorModeValue(
						"rgba(255, 255, 255, 0.8)",
						"rgba(26, 32, 44, 0.8)"
					),
				}}
			>
				<Container as={Flex} maxW={"7xl"} align={"center"}>
					<Flex flex={{ base: 1 }} justify="start" ml={{ base: -2, md: 0 }}>
						<Heading
							textAlign="left"
							fontFamily={"heading"}
							color={useColorModeValue("teal.800", "white")}
							as="h2"
							size="lg"
						>
							<Box
								as={"span"}
								color={useColorModeValue("teal.400", "teal.300")}
								position={"relative"}
								zIndex={10}
								_after={{
									content: '""',
									position: "absolute",
									left: 0,
									bottom: 0,
									w: "full",
									h: "30%",
									bg: useColorModeValue("teal.100", "teal.900"),
									zIndex: -1,
								}}
							>
								<NextLink href="/">🤝BetterFund</NextLink>
							</Box>
						</Heading>
					</Flex>
					<Stack
						flex={{ base: 1, md: 0 }}
						justify={"flex-end"}
						direction={"row"}
						spacing={6}
						display={{ base: "none", md: "flex" }}
					>
						<Button
							fontSize={"md"}
							fontWeight={600}
							variant={"link"}
							display={{ base: "none", md: "inline-flex" }}
						>
							<NextLink href="/campaign/new">Create Campaign</NextLink>
						</Button>
						<Button
							fontSize={"md"}
							fontWeight={600}
							variant={"link"}
							display={{ base: "none", md: "inline-flex" }}
						>
							<NextLink href="/#howitworks"> How it Works</NextLink>
						</Button>

						{wallet.status === "connected" ? (
							<Menu>
								<MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
									{wallet.account.substr(0, 10) + "..."}
								</MenuButton>
								<MenuList>
									<MenuItem onClick={() => wallet.reset()}>
										{" "}
										Disconnect Wallet{" "}
									</MenuItem>
								</MenuList>
							</Menu>
						) : (
							<div>
								<Button
									display={{ base: "none", md: "inline-flex" }}
									fontSize={"md"}
									fontWeight={600}
									color={"white"}
									bg={"teal.400"}
									href={"#"}
									_hover={{
										bg: "teal.300",
									}}
									onClick={() => switchNetwork(4)}
								>
									Connect Wallet{" "}
								</Button>
							</div>
						)}

						<DarkModeSwitch />
					</Stack>

					<Flex display={{ base: "flex", md: "none" }}>
						<DarkModeSwitch />
					</Flex>
				</Container>
			</Flex>
		</Box>
	);
}
