"use client";

import { merge } from "@/lib/utilities/tailwind";
import { motion } from "motion/react";
import { useMemo, useState } from "react";
import seedrandom from "seedrandom";

export default function Puzzle() {
    // Using a seed for randomization to avoid hydration errors
    const rng = seedrandom("168");

    // The React state of the playing board
    const [grid, setGrid] = useState(createRandomizedGrid(5));

    // Track whether the player has won
    const hasWon = useMemo(() => {
        return grid.every((row) => row.every((tile) => tile === true));
    }, [grid]);

    // Create a 2D array with pseudo-randomized starting positions
    function createRandomizedGrid(size: number): boolean[][] {
        return Array.from({ length: size }, () => Array.from({ length: size }, () => rng() > 0.5));
    }

    return (
        <figure role="presentation">
            <div
                aria-hidden="true"
                className="group grid grid-cols-5 grid-rows-5 aspect-square border-neutral-800 border w-64 overflow-hidden rounded"
            >
                {grid.map((column, colIndex) =>
                    column.map((tile, rowIndex) => {
                        return (
                            <motion.button
                                key={`tile-${colIndex}-${rowIndex}`}
                                aria-hidden="true"
                                className={merge(
                                    // Each tile has a classname to indicate column and row
                                    `puzzle-tile pz-x-${colIndex} pz-y-${rowIndex}`,
                                    "cursor-pointer col-span-1 row-span-1 size-full hover:puzzle-hover-current",
                                    {
                                        // Looks messy, but apply styles if tile is hovered or on same axes of hover
                                        "group-has-[.pz-x-0:hover]:puzzle-hover-h": colIndex == 0,
                                        "group-has-[.pz-x-1:hover]:puzzle-hover-h": colIndex == 1,
                                        "group-has-[.pz-x-2:hover]:puzzle-hover-h": colIndex == 2,
                                        "group-has-[.pz-x-3:hover]:puzzle-hover-h": colIndex == 3,
                                        "group-has-[.pz-x-4:hover]:puzzle-hover-h": colIndex == 4,
                                        "group-has-[.pz-y-0:hover]:puzzle-hover-v": rowIndex == 0,
                                        "group-has-[.pz-y-1:hover]:puzzle-hover-v": rowIndex == 1,
                                        "group-has-[.pz-y-2:hover]:puzzle-hover-v": rowIndex == 2,
                                        "group-has-[.pz-y-3:hover]:puzzle-hover-v": rowIndex == 3,
                                        "group-has-[.pz-y-4:hover]:puzzle-hover-v": rowIndex == 4,
                                    }
                                )}
                                onClick={() => {
                                    setGrid(
                                        grid.map((cols, x) => {
                                            return cols.map((tile, y) => {
                                                // If clicked, or on the same horizontal or vertical axes as clicked
                                                if (x == colIndex || y == rowIndex) {
                                                    return !tile;
                                                }

                                                // Else remain unchanged
                                                return tile;
                                            });
                                        })
                                    );
                                }}
                                // Motion.dev animations
                                initial={{
                                    backgroundColor: tile ? "#d4d4d4" : "#0a0a0a",
                                }}
                                animate={{
                                    backgroundColor: tile ? "#d4d4d4" : "#0a0a0a",
                                }}
                                transition={{
                                    duration: 0.25,
                                    ease: "easeOut",
                                }}
                            />
                        );
                    })
                )}
            </div>
            <figcaption className="text-xs font-semibold text-center text-neutral-400 bg-neutral-950 mt-2">
                <span className="sr-only">A lights out puzzle game (visual only).</span>
                <span>
                    {hasWon ? <>Congratulations. You won!</> : <>Click the tiles. Fill to win.</>}
                </span>
            </figcaption>
        </figure>
    );
}
