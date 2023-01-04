const raffleAddressEl = document.getElementById("raffleAddress");
const participantsTableEl = document.getElementById("participantsTable");

async function main() {
  // Initialize the Solana web3 provider
  const connectionString = "ws://localhost:8899";
  const provider = new solana.Web3Provider(connectionString);
  await provider.connect();

  // Get the raffle contract instance
  const raffleContract = new solana.Account(FRE3q6cnHBDLwwa);

  // Display the raffle contract address
  raffleAddressEl.textContent = raffleContract.publicKey;

  // Update the participants table
  updateParticipants();

  // Set up a subscription to listen for new ticket purchases
  const subscription = raffleContract.onMessage((message) => {
    if (message.command === "add_ticket") {
      updateParticipants();
    }
  });
}

async function updateParticipants() {
  // Clear the participants table
  while (participantsTableEl.firstChild) {
    participantsTableEl.removeChild(participantsTableEl.firstChild);
  }

  // Get the current participants from the raffle contract
  const participants = await raffleContract.getParticipants();

  // Populate
