import { useState, useEffect, useRef } from "react";

const SettingsModal = ({ onClose }: { onClose: () => void }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-20">
			{/* Modal backdrop */}
			<div
				className="absolute inset-0 bg-black bg-opacity-80"
				onClick={() => onClose}
			></div>

			{/* Modal content */}
			<div className="relative w-2/3 max-w-2xl border border-orange-600 bg-black z-30 p-4">
				<div className="text-sm text-orange-600 font-bold mb-4 border-b border-orange-600 pb-2 flex justify-between">
					<span>SYSTEM CONFIGURATION</span>
				</div>

				<div className="grid gap-4">
					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs text-orange-600 mb-1">
								API ENDPOINT:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="https://api.example.com/v1"
							/>
						</div>

						<div>
							<label className="block text-xs text-orange-600 mb-1">
								API KEY:
							</label>
							<input
								type="password"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="sk-xxxxx"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs text-orange-600 mb-1">
								MODEL:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="gpt-4-turbo"
							/>
						</div>

						<div>
							<label className="block text-xs text-orange-600 mb-1">
								TEMPERATURE:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="0.7"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs text-orange-600 mb-1">
								TOP-K TOKENS:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="5"
							/>
						</div>

						<div>
							<label className="block text-xs text-orange-600 mb-1">
								TOP-P:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="0.9"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<label className="block text-xs text-orange-600 mb-1">
								FREQUENCY PENALTY:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="0.0"
							/>
						</div>

						<div>
							<label className="block text-xs text-orange-600 mb-1">
								PRESENCE PENALTY:
							</label>
							<input
								type="text"
								className="w-full bg-black text-teal-400 border border-teal-900 p-2 focus:outline-none focus:border-orange-600"
								placeholder="0.0"
							/>
						</div>
					</div>
				</div>

				<div className="mt-6 flex justify-between">
					<p className="text-[0.9rem] text-teal-400">
						All settings are stored locally in browser.
					</p>
					<div className="flex gap-4">
						<button
							onClick={() => onClose()}
							className="cursor-pointer border border-teal-900 px-4 py-2 text-teal-400 hover:bg-teal-900 hover:bg-opacity-20"
						>
							CANCEL
						</button>
						<button
							onClick={() => onClose()}
							className="cursor-pointer border border-orange-600 px-4 py-2 text-orange-600 hover:bg-orange-900 hover:bg-opacity-20"
						>
							SAVE
						</button>
					</div>
				</div>

				{/* Eva-inspired decorative elements */}
				<div className="absolute top-0 right-0 w-16 h-16 border-r-2 border-t-2 border-orange-600 pointer-events-none opacity-60"></div>
				<div className="absolute bottom-0 left-0 w-16 h-16 border-l-2 border-b-2 border-teal-400 pointer-events-none opacity-60"></div>
			</div>
		</div>
	);
};

const RetroTokenizer = () => {
	const [prompt, setPrompt] = useState(
		"The ship's computer analyzed the alien signal as <unintelligible>. Ash suggested we investigate."
	);
	const [tokens, setTokens] = useState([]);
	const [selectedToken, setSelectedToken] = useState(null);
	const [tokenData, setTokenData] = useState(null);
	const [scanlineActive, setScanlineActive] = useState(true);
	const [blinkingElement, setBlinkingElement] = useState(true);
	const [focusedIndex, setFocusedIndex] = useState(-1); // -1 for prompt, 0+ for tokens
	const [showSettings, setShowSettings] = useState(false);

	// Refs for DOM elements
	const promptRef = useRef(null);
	const tokenListRef = useRef(null);
	const tokenRefs = useRef([]);

	// Mock tokenizer function - in a real app, you'd connect to an actual tokenizer API
	const tokenizeText = (text) => {
		// Simple mock tokenization by spaces and some punctuation
		return text
			.replace(/([.,!?;:])/g, " $1 ")
			.split(" ")
			.filter((token) => token.length > 0)
			.map((token, index) => ({
				id: index,
				text: token,
				probability: Math.random() * 0.7 + 0.3, // Random mock probability between 0.3 and 1.0
				logit: (Math.random() * 4 - 2).toFixed(3), // Random mock logit score between -2 and 2
			}));
	};

	// Generate mock next token predictions
	const generateNextTokenPredictions = (tokenIndex) => {
		const mockWords = [
			"sequence",
			"warning",
			"threat",
			"message",
			"code",
			"transmission",
			"danger",
			"signal",
			"data",
			"protocol",
			"system",
			"emergency",
			"status",
			"report",
			"analysis",
			"approaching",
			"unknown",
			"detected",
		];

		const firstValue = 0.4 + Math.random() * 0.2; // Between 0.4 and 0.6

		// Remaining sum to distribute
		const remainingSum = 1 - firstValue;

		// Generate 4 random values
		const randomValues = Array(4)
			.fill()
			.map(() => Math.random());

		// Normalize these values to sum to remainingSum
		const valueSum = randomValues.reduce((sum, val) => sum + val, 0);
		const normalizedValues = randomValues.map(
			(val) => (val / valueSum) * remainingSum
		);

		// Sort remaining values in descending order
		normalizedValues.sort((a, b) => b - a);

		// Create final array with the first value included
		const finalValues = [firstValue, ...normalizedValues];

		return Array(5)
			.fill(0)
			.map((_, i) => ({
				token: mockWords[Math.floor(Math.random() * mockWords.length)],
				probability: finalValues[i].toFixed(3),
				logit: (Math.random() * 5 - i).toFixed(3),
			}));
	};

	useEffect(() => {
		setTokens(tokenizeText(prompt));

		// Toggle scanline effect periodically for that retro CRT feel
		const scanlineInterval = setInterval(() => {
			setScanlineActive((prev) => !prev);
			setScanlineActive(true);

			// set back to false after 800ms
			setTimeout(() => {
				setScanlineActive(false);
			}, 900);
		}, 5000);

		// Blinking element effect for warning indicators
		const blinkInterval = setInterval(() => {
			setBlinkingElement((prev) => !prev);
		}, 800);

		return () => {
			clearInterval(scanlineInterval);
			clearInterval(blinkInterval);
		};
	}, [prompt]);

	// Initialize tokenRefs when tokens change
	useEffect(() => {
		tokenRefs.current = tokenRefs.current.slice(0, tokens.length);
	}, [tokens]);

	const handleTokenClick = (index) => {
		const token = tokens[index];
		setSelectedToken(token);
		setFocusedIndex(index);

		// Generate mock data about this token
		setTokenData({
			token: token.text,
			index: index,
			probability: token.probability.toFixed(3),
			logit: token.logit,
			nextTokens: generateNextTokenPredictions(index),
			entropy: (Math.random() * 3 + 1).toFixed(3),
			surprisal: (Math.random() * 5 + 2).toFixed(3),
		});
	};

	// Handle keyboard navigation
	const handleKeyDown = (e) => {
		if (e.key === "Tab") {
			e.preventDefault();

			// Toggle between prompt and token list
			if (focusedIndex === -1) {
				setFocusedIndex(0);
				if (tokenRefs.current[0]) {
					tokenRefs.current[0].focus();
				}
			} else {
				setFocusedIndex(-1);
				if (promptRef.current) {
					promptRef.current.focus();
				}
			}
		} else if (focusedIndex >= 0) {
			// Handle arrow keys in token list
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					if (focusedIndex < tokens.length - 1) {
						const newIndex = focusedIndex + 1;
						setFocusedIndex(newIndex);
						if (tokenRefs.current[newIndex]) {
							tokenRefs.current[newIndex].focus();
						}
					}
					break;
				case "ArrowUp":
					e.preventDefault();
					if (focusedIndex > 0) {
						const newIndex = focusedIndex - 1;
						setFocusedIndex(newIndex);
						if (tokenRefs.current[newIndex]) {
							tokenRefs.current[newIndex].focus();
						}
					}
					break;
				case "Enter":
				case " ":
					e.preventDefault();
					handleTokenClick(focusedIndex);
					break;
				default:
					break;
			}
		}
	};

	// Auto-focus the prompt field on component mount
	useEffect(() => {
		if (promptRef.current) {
			promptRef.current.focus();
			setFocusedIndex(-1);
		}
	}, []);

	const initialTime = 35;
	const [timeLeft, setTimeLeft] = useState(initialTime);

	// Countdown timer
	useEffect(() => {
		// Start the timer immediately when component mounts
		const intervalId = setInterval(() => {
			setTimeLeft((prevTime) => {
				// If time reaches the reset threshold, reset to initial time
				if (prevTime <= 0) {
					return initialTime;
				}
				// Otherwise, continue counting down
				return prevTime - 1;
			});
		}, 1000);

		// Clean up interval on component unmount
		return () => {
			clearInterval(intervalId);
		};
	}, []);

	return (
		<div
			className="flex flex-col h-screen w-full bg-black text-teal-400 font-mono p-4 relative"
			onKeyDown={handleKeyDown}
		>
			{/* Grid pattern background */}
			{/* <div
				className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(rgba(0, 180, 180, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 180, 0.5) 1px, transparent 1px)",
					backgroundSize: "20px 20px",
				}}
			/> */}

			{/* Scanline effect */}
			{scanlineActive && (
				<div className="absolute top-0 left-0 w-full h-full pointer-events-none z-100">
					<div
						className="h-full w-full opacity-50"
						style={{
							background:
								"linear-gradient(transparent 50%, rgba(0, 0, 0, 0.4) 50%)",
							backgroundSize: "100% 4px",
						}}
					/>
				</div>
			)}

			{/* CRT glow effect */}
			<div className="absolute top-0 left-0 w-full h-full bg-teal-900 opacity-20 pointer-events-none" />

			{/* Eva-inspired horizontal orange line */}
			<div className="absolute top-15 left-0 w-full h-px bg-orange-600 opacity-70 pointer-events-none" />
			<div className="absolute bottom-1 left-0 w-full h-px bg-orange-600 opacity-70 pointer-events-none" />

			{/* Header with Eva-inspired design */}
			<div className="flex items-center justify-between mb-4 pb-2">
				<div className="flex items-center">
					<div className="text-orange-600 mr-2 mb-1">⬤</div>
					<div className="text-xl font-bold text-orange-600">ORB</div>
				</div>
				<div className="text-teal-400">SYSTEM STATUS: NORMAL</div>
				<div className="flex align-center gap-x-4">
					<div className="text-teal-400">
						T-MINUS {`24:15:${timeLeft < 10 ? "0" : ""}${timeLeft}`}
					</div>
					<button
						className="text-orange-600 border cursor-pointer border-teal-900 px-2 py-1 text-xs flex items-center hover:bg-teal-900 hover:bg-opacity-20 focus:outline-none focus:border-orange-600"
						onClick={() => setShowSettings(!showSettings)}
						aria-label="Settings"
					>
						<span className="mr-1">SETTINGS</span>
						<span
							className={`${blinkingElement ? "opacity-100" : "opacity-40"}`}
						>
							⚙
						</span>
					</button>
				</div>
			</div>

			{/* Settings modal */}
			{showSettings && <SettingsModal onClose={() => setShowSettings(false)} />}

			{/* Main content */}
			<div className="flex h-full gap-4">
				{/* Left panel - Input and tokens */}
				<div className="flex flex-col w-1/2 gap-4">
					{/* Prompt input */}
					<div className="border border-teal-900 p-2 relative">
						<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1 flex justify-between">
							PROMPT ENTRY
							<span className={blinkingElement ? "opacity-100" : "opacity-0"}>
								⬤
							</span>
						</div>
						<textarea
							ref={promptRef}
							className={`w-full h-32 bg-black text-teal-400 font-mono p-2 border resize-none focus:outline-none ${
								focusedIndex === -1
									? "border-orange-600 bg-teal-900 bg-opacity-10"
									: "border-teal-900"
							}`}
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
							onFocus={() => setFocusedIndex(-1)}
							tabIndex={1}
						/>
						<div className="absolute top-8 right-0 w-1/2 h-px bg-orange-600 opacity-50" />
					</div>

					{/* Token breakdown */}
					<div className="border border-teal-900 p-2 flex-grow overflow-auto relative">
						<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1">
							TOKEN ANALYSIS
						</div>
						<div className="grid grid-cols-1 gap-2" ref={tokenListRef}>
							{tokens.map((token, i) => (
								<div
									key={i}
									ref={(el) => (tokenRefs.current[i] = el)}
									className={`flex items-center border p-2 cursor-pointer hover:bg-teal-900 hover:bg-opacity-20 ${
										selectedToken?.id === i || focusedIndex === i
											? "border-orange-600 bg-teal-900 bg-opacity-10"
											: "border-teal-900"
									}`}
									onClick={() => handleTokenClick(i)}
									onFocus={() => setFocusedIndex(i)}
									tabIndex={i + 2}
								>
									<div className="text-xs text-orange-600 mr-2">
										{i.toString().padStart(2, "0")}
									</div>
									<div className="text-teal-400 flex-grow">{token.text}</div>
									<div className="text-xs text-teal-600">
										p={token.probability.toFixed(2)}
									</div>
								</div>
							))}
						</div>
					</div>
				</div>

				{/* Right panel - Token details */}
				<div className="w-1/2 border border-teal-900 p-4 flex flex-col relative">
					{!tokenData ? (
						<div className="flex items-center justify-center h-full text-center">
							<div>
								<div className="text-xl text-orange-600 mb-4">
									[SELECT TOKEN]
								</div>
								<div className="text-teal-400 text-sm">AWAITING INPUT</div>
								<div
									className={`text-orange-600 mt-4 ${
										blinkingElement ? "opacity-100" : "opacity-40"
									}`}
								>
									ANALYZING...
								</div>
							</div>
						</div>
					) : (
						<>
							<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1">
								TOKEN ANALYSIS
							</div>

							<div className="flex mb-4">
								<div className="w-full px-4 py-2 flex justify-between items-center">
									<div className="text-xs text-orange-600">TOKEN:</div>
									<div className="text-xl text-teal-400">
										"{tokenData.token}"
									</div>
									<div className="text-xs text-orange-600">
										POS:{" "}
										<span className="text-teal-400">{tokenData.index}</span>
									</div>
								</div>
							</div>

							<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1">
								METRICS
							</div>

							<div className="grid grid-cols-2 gap-4 mb-4">
								<div className="p-2 relative">
									<div className="text-xs text-orange-600">PROBABILITY:</div>
									<div className="text-teal-400 text-xl">
										{tokenData.probability}
									</div>
									<div className="absolute top-0 right-0 w-1/4 h-px bg-teal-400" />
								</div>
								<div className="p-2 relative">
									<div className="text-xs text-orange-600">LOGIT:</div>
									<div className="text-teal-400 text-xl">{tokenData.logit}</div>
									<div className="absolute top-0 right-0 w-1/4 h-px bg-teal-400" />
								</div>
								<div className="p-2 relative">
									<div className="text-xs text-orange-600">ENTROPY:</div>
									<div className="text-teal-400 text-xl">
										{tokenData.entropy}
									</div>
									<div className="absolute top-0 right-0 w-1/4 h-px bg-teal-400" />
								</div>
								<div className="p-2 relative">
									<div className="text-xs text-orange-600">SURPRISAL:</div>
									<div className="text-teal-400 text-xl">
										{tokenData.surprisal}
									</div>
									<div className="absolute top-0 right-0 w-1/4 h-px bg-teal-400" />
								</div>
							</div>

							<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1 flex justify-between">
								<span>NEXT TOKEN PREDICTIONS</span>
								<span className={blinkingElement ? "opacity-100" : "opacity-0"}>
									⬤
								</span>
							</div>
							<div className="mt-4">
								<table className="w-full border border-teal-900">
									<thead>
										<tr className="border-b border-teal-900">
											<th className="text-left p-2 text-xs text-orange-600">
												TOKEN
											</th>
											<th className="text-right p-2 text-xs text-orange-600">
												PROB
											</th>
											<th className="text-right p-2 text-xs text-orange-600">
												LOGIT
											</th>
										</tr>
									</thead>
									<tbody>
										{tokenData.nextTokens.map((prediction, i) => (
											<tr
												key={i}
												className={`border-b border-teal-900 ${
													i === 0 ? "bg-orange-900 bg-opacity-20" : ""
												}`}
											>
												<td className="p-2 text-teal-400">
													{prediction.token}
												</td>
												<td className="p-2 text-right text-teal-400">
													{prediction.probability}
												</td>
												<td className="p-2 text-right text-teal-400">
													{prediction.logit}
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>

							{/* Cumulative Probability Distribution */}
							<div className="mt-4">
								<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1">
									CUMULATIVE PROBABILITY DISTRIBUTION
								</div>
								<div className="h-24 border border-teal-900 p-2 relative">
									{/* Probability bars */}
									{tokenData.nextTokens.map((prediction, i) => {
										// Calculate cumulative probability
										const cumulativeProb = tokenData.nextTokens
											.slice(0, i + 1)
											.reduce((sum, p) => sum + parseFloat(p.probability), 0);

										// Calculate previous cumulative probability
										const prevCumulativeProb =
											i === 0
												? 0
												: tokenData.nextTokens
														.slice(0, i)
														.reduce(
															(sum, p) => sum + parseFloat(p.probability),
															0
														);

										// Calculate width percentage for this token
										const width = `${
											parseFloat(prediction.probability) * 100
										}%`;

										// Calculate position percentage
										const left = `${prevCumulativeProb * 100}%`;

										return (
											<div
												key={i}
												className="absolute bottom-0 h-16 border-r border-teal-900 flex items-end justify-center"
												style={{
													left: left,
													width: width,
													backgroundColor: `rgba(0, 180, 180, ${
														0.7 - i * 0.12
													})`,
												}}
											>
												<div className="text-xs rotate-90 origin-bottom-left absolute bottom-0 left-1 text-black">
													{prediction.token.length > 6
														? prediction.token.substring(0, 6) + "..."
														: prediction.token}
												</div>
												{/* <div className="w-full h-2 bg-orange-600 absolute bottom-0"></div> */}
											</div>
										);
									})}

									{/* Grid lines */}
									<div
										className="w-full h-full absolute top-0 left-0 grid grid-cols-4"
										style={{ pointerEvents: "none" }}
									>
										{[...Array(5)].map((_, i) => (
											<div
												key={i}
												className="h-full border-l border-teal-900 opacity-30"
												style={{ left: `${i * 25}%` }}
											></div>
										))}
									</div>

									{/* X-axis labels */}
									<div className="absolute bottom-0 left-0 w-full flex justify-between px-1 text-xs text-teal-600">
										<span>0.0</span>
										<span>0.25</span>
										<span>0.5</span>
										<span>0.75</span>
										<span>1.0</span>
									</div>
								</div>
							</div>

							<div className="flex mt-auto justify-between text-xs">
								<div>
									<span className="text-orange-600">MAGI:</span>
									<span className="text-teal-400 ml-2">ANALYZING...</span>
								</div>
								<div className="text-teal-400">
									<span>ORB ANALYSIS v0.01 GAMMA</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default RetroTokenizer;
