import React, { useState, useEffect } from "react";

const RetroTokenizer = () => {
	const [prompt, setPrompt] = useState(
		"The ship's computer analyzed the alien signal as <unintelligible>. Ash suggested we investigate."
	);
	const [tokens, setTokens] = useState([]);
	const [selectedToken, setSelectedToken] = useState(null);
	const [tokenData, setTokenData] = useState(null);
	const [scanlineActive, setScanlineActive] = useState(true);
	const [blinkingElement, setBlinkingElement] = useState(true);

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

		return Array(5)
			.fill()
			.map((_, i) => ({
				token: mockWords[Math.floor(Math.random() * mockWords.length)],
				probability: (0.9 - i * 0.15).toFixed(3),
				logit: (Math.random() * 5 - i).toFixed(3),
			}));
	};

	useEffect(() => {
		setTokens(tokenizeText(prompt));

		// Toggle scanline effect periodically for that retro CRT feel
		const scanlineInterval = setInterval(() => {
			setScanlineActive((prev) => !prev);
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

	const handleTokenClick = (index) => {
		const token = tokens[index];
		setSelectedToken(token);

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

	return (
		<div className="flex flex-col h-screen w-full bg-black text-teal-400 font-mono p-4 overflow-hidden relative">
			{/* Grid pattern background */}
			<div
				className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none"
				style={{
					backgroundImage:
						"linear-gradient(rgba(0, 180, 180, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 180, 180, 0.5) 1px, transparent 1px)",
					backgroundSize: "20px 20px",
				}}
			/>

			{/* Scanline effect */}
			{scanlineActive && (
				<div className="absolute top-0 left-0 w-full h-full pointer-events-none">
					<div
						className="h-full w-full opacity-10"
						style={{
							background:
								"linear-gradient(transparent 50%, rgba(0, 0, 0, 0.4) 50%)",
							backgroundSize: "100% 4px",
						}}
					/>
				</div>
			)}

			{/* CRT glow effect */}
			<div className="absolute top-0 left-0 w-full h-full bg-teal-900 opacity-5 pointer-events-none" />

			{/* Eva-inspired horizontal orange line */}
			<div className="absolute top-24 left-0 w-full h-px bg-orange-600 opacity-70 pointer-events-none" />
			<div className="absolute bottom-24 left-0 w-full h-px bg-orange-600 opacity-70 pointer-events-none" />

			{/* Header with Eva-inspired design */}
			<div className="flex items-center justify-between mb-4 pb-2">
				<div className="flex items-center">
					<div className="text-orange-600 mr-2">▲</div>
					<div className="text-xl font-bold text-orange-600">NERV</div>
				</div>
				<div className="text-teal-400">SYSTEM STATUS: NORMAL</div>
				<div className="text-teal-400">
					T-MINUS {blinkingElement ? "24:15:34" : "24:15:35"}
				</div>
			</div>

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
							className="w-full h-32 bg-black text-teal-400 font-mono p-2 border border-teal-900 resize-none focus:outline-none focus:border-orange-600"
							value={prompt}
							onChange={(e) => setPrompt(e.target.value)}
						/>
						<div className="absolute top-8 right-0 w-1/2 h-px bg-orange-600 opacity-50" />
					</div>

					{/* Token breakdown */}
					<div className="border border-teal-900 p-2 flex-grow overflow-auto relative">
						<div className="text-xs text-orange-600 font-bold mb-2 border-b border-orange-600 pb-1">
							TOKEN ANALYSIS
						</div>
						<div className="grid grid-cols-1 gap-2">
							{tokens.map((token, i) => (
								<div
									key={i}
									className={`flex items-center border p-2 cursor-pointer hover:bg-teal-900 hover:bg-opacity-20 ${
										selectedToken?.id === i
											? "border-orange-600 bg-teal-900 bg-opacity-10"
											: "border-teal-900"
									}`}
									onClick={() => handleTokenClick(i)}
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

							<div className="flex-grow">
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

							<div className="mt-4 flex justify-between text-xs">
								<div>
									<span className="text-orange-600">MAGI:</span>
									<span className="text-teal-400 ml-2">ANALYZING...</span>
								</div>
								<div className="text-teal-400">
									<span>LLM ANALYSIS v1.08</span>
								</div>
							</div>
						</>
					)}
				</div>
			</div>

			{/* Bottom terminal section */}
			<div className="mt-4 border-t border-teal-900 pt-2 flex items-center">
				<span className="text-orange-600 mr-2">NERV&gt;</span>
				<span className="text-teal-400">ANALYZE TOKEN SEQUENCE</span>
				<span className={blinkingElement ? "text-teal-400 ml-1" : "opacity-0"}>
					_
				</span>
			</div>
		</div>
	);
};

export default RetroTokenizer;
